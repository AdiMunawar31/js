$(document).ready(function () {

    const uri = `https://api.binance.com/api/v3/ticker/24hr`;
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h';

    const getApi = fetch(url)
        .then(response => response.json())
        .then(result => {
            render(result);
            console.log(result);
        })
        .catch(err => console.log(err));

    let result = '';

    function render(data) {
        $.each(data, function (key, item) {

            result += `<tr>
            <th scope="row">${item.market_cap_rank}</th>
            <td>${item.name}</td>
            <td><img src="${item.image}" height="30" ></td>
            <td>${item.symbol.toUpperCase()}</td>
            ${item.price_change_percentage_24h > 0 ? '<td style="color: green">' + item.price_change_percentage_24h + '%</td>' : '<td style="color: red">' + item.price_change_percentage_24h + '%</td>'}
            <td>$${item.current_price}</td>
            <td>$${item.high_24h}</td>
            <td>$${item.low_24h}</td>
        </tr>`;


            setInterval(() => {
                $('#data').html(result);
                // $(this).wrap();
            }, 1000);
        })
    }





    // BINANCE
    // =====================================================================================================

    $('#select').on('change', function () {
        $('#logo').html($(this).val())
        update($(this).val());
    });

    function update(pair) {
        let results = '';
        let newUri = uri + `?symbol=${pair}`;
        console.log(newUri);

        const getBnb = fetch(newUri)
            .then(response => response.json())
            .then(result => {
                console.log(result.symbol);
                results += `
            <tr>
                <th scope="row">1</th>
                <td>${result.symbol}</td>
                <td>$${result.lastPrice}</td>
                ${result.priceChangePercent > 0 ? '<td style="color: green">' + result.priceChangePercent + '%</td>' : '<td style="color: red">' + result.priceChangePercent + '%</td>'}
                ${result.highPrice > result.highPrice ? '<td style="color: green">$' + result.highPrice + '%</td>' : '<td style="color: red">$' + result.highPrice + '</td>'}
                ${result.lowPrice > result.lowPrice ? '<td style="color: green">$' + result.lowPrice + '%</td>' : '<td style="color: red">$' + result.lowPrice + '</td>'}
                <td>$${result.volume}</td>
                <td>$${result.quoteVolume}</td>
            </tr>`;

                $('#bnb').html(results);


            })
            .catch(err => console.log(err));
    }







})
