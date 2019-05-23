

$(document).ready(function () {

    $(document).on("click", "#purchase-button", purchaseItem)
    // initial products array
    var products = []
    // display products on site immediatelywhen page loads
    getProducts();

    function purchaseItem(event) {
        event.preventDefault()
        var id = $(this).data("id")
        var stock = $(this).data("stock")
        $.ajax({
            method: "GET",
            url: "/api/products/" + id
        }).then(checkStock(stock))
    }

    function checkStock(stock) {
        if ($(this).val() <= stock) {
            console.log("Purchased!")
        }
        else if ($(this).val() >= stock) {
            console.log.length("sold out!")
        }
    }

    function getProducts() {
        $.get("/api/products", function (data) {
            products = data;
            console.log()
            createCard(products)
        })
    }

    // create card function

    function createCard(items) {
        for (let i = 0; i < items.length; i++) {

            const productCard =
                `    <div class="col-lg-4">
                <div class="card">
                    <div class="card-header" id="product-name-${i}">
                        ${items[i].name}
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <form>
                                <label for="qty" class="col-sm-4 col-form-label" id="price-${i}"> $${items[i].price}.99</label>
                                <div class="col-sm-4">
                                    <input type="number" class="form-control" id="qty" placeholder="Qty">
                                    <button type="button" class="btn btn-primary btn-defult" id="purchase-button">Purchase</button>
                                </div>
        
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
            $(".row").append(productCard)
        }

    }

})
