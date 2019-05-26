


$(document).ready(function () {


    $(document).on("click", "#purchase-button", purchaseItem)





    // initial products array
    var products = []
    // display products on site immediatelywhen page loads
    getProducts();

    // when purchase button is clicked - check if item is out of stock or not

    function purchaseItem(event) {
        event.preventDefault()
        console.log("click")
        var id = $(this).attr("data-id")
        var qty = $("#qty").val()
        $.get("/api/products/" + id, function (data) {
            products = data;
            console.log(products[0].stock)
            if (qty <= parseInt(products[0].stock)) {

                showModal("If you are sure you would like to make this purchase please press confirm.", products[0].name, `$${products[0].price}.99`)
                updateStock(products, qty)
            }
            else if (qty >= parseInt(products[0].stock)) {
                showModal("We are sorry, that item is sold out.", products[0].name, "")
            }
        })

    }






    // create modal function

    function updateStock(products, qty) {
        console.log("updating")
        console.log(products)
        newQty = products[0].stock -= qty;
        console.log(newQty);
        $.ajax({
            method: "PUT",
            url: "/api/products/" + products[0].id,
            data: {stock: newQty}
        })
    }


    function showModal(message, name, price) {
        var modal = ` <div id="purchaseModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">
                       ${message}
                    </h3>
                </div>
                <div class="modal-body img-responsive">
                    <h4 id="match-name">${name}</h4>
                    <h5 id="match-name">${price}</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="confirm">Confirm</button>
                </div>
            </div>

        </div>
    </div>`
        $(modal).modal("toggle");
    }

    // search for the product
    function getProducts() {
        $.get("/api/products", function (data) {
            products = data;
            console.log()
            createCard(products)
        })
    }

    // create card from product

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
                                    <input type="number" class="form-control" id="qty" data-stock="" placeholder="Qty">
                                    <button type="button" class="btn btn-primary btn-defult" id="purchase-button" data-id=${items[i].id}>Purchase</button>
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



