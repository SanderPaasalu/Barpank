<script context="module">
    export async function preload({params}, {token}) {
        if (!token) {
            this.redirect(302, `/login`);
        }
    }
</script>
<script>
    import {goto, stores} from '@sapper/app';
    import {post} from 'utils.js';

    let accountFrom = '';
    let accountTo = '';
    let amount = '';
    let explanation = '';
    let error = null;

    async function submit(event) {
        const response = await post(`auth/createTransaction`, {accountFrom, accountTo, amount, explanation});

        error = response.error;
        if (!error) {
            goto('/overview');
        }
    }

    async function getData() {
        return await post('auth/getData').then(r => {
            try {

                // Set accountFrom to first account to fix account dropdown
                accountFrom = r.accounts[0].number

            } catch (e) {
                console.log(e)
            }
            return r
        })
    }

</script>
<svelte:head>
    <title>Transactions • barBank</title>
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Transactions</h1>

                {#if error}
                    <div class="alert alert-danger" role="alert">{error}</div>
                {/if}

                <form on:submit|preventDefault={submit}>
                    <fieldset class="form-group">
                        <select class="form-control form-control-lg"
                                required placeholder="Account From" bind:value={accountFrom}>
                            {#if process.browser}
                                {#await getData()}
                                    loading...
                                {:then userData}

                                    {#each userData.accounts as account}
                                        <option value={account.number}>
                                            {account.number}
                                        </option>
                                    {/each}
                                {/await}
                            {/if}
                        </select>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Account To"
                               bind:value={accountTo}>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="number" min="0.00" step=".01" required
                               placeholder="Amount"
                               bind:value={amount}>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Explanation"
                               bind:value={explanation}>
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">
                        Make transaction
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>








