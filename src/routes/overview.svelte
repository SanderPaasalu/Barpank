<script context="module">
    export async function preload({params}, {token}) {
        if (!token) {
            this.redirect(302, `/login`);
        }
    }
</script>

<script>
    import {post} from 'utils.js';

    async function getData() {
        return await post('auth/getData').then(r => {
            r.funds = r.accounts.reduce((funds, accounts) => funds + accounts.balance, 0)
            return r
        })
    }

    async function getTrans() {
        return await post('auth/getTrans')
    }
</script>

{#if process.browser}


    {#await getData()}
        loading...
    {:then userData}
        <div class="overview">
            <section><h1>{userData.name}</h1></section>
            <h5>Available funds</h5>
            <section>{userData.funds}</section>
            <p>Accounts</p>
            <section>
                <ul>
                    {#each userData.accounts as account}
                        <li>{account.number} ({account.name})</li>
                    {/each       }
                </ul>
            </section>
        </div>
        {#await getTrans()}
            loading...
        {:then transactions}
            <table class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>name</th>
                    <th>amount</th>
                    <th>statusDetail</th>
                    <th>status</th>
                </tr>
                </thead>
                {#each transactions as trans}
                    <tr>
                        <td>{trans.senderName}<br>{trans.explanation}</td>
                        <td style="color: {trans.amount >= 0 ? 'green' : 'red'}">{trans.amount} {trans.currency}</td>
                        <td>{trans.userId}</td>
                        <td>{trans.status}<br>{trans.statusDetail}</td>
                    </tr>
                {/each}
            </table>
        {/await}
    {/await       }
{/if}