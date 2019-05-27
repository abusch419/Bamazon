


$(document).ready(function () {

    $(document).on("click", ".delete-button", DeleteItem)
    





    // initial products array
    var products = []
    // display products on site immediatelywhen page loads
    getProducts();

    // when purchase button is clicked - check if item is out of stock or not







    // create modal function

    function updateStock(product, qty, id) {
        console.log("updating")
        console.log(product)
        newQty = product.stock -= qty;
        console.log(newQty);
        $.ajax({
            method: "PUT",
            url: "/api/products/" + product.id,
            data: {stock: newQty}
        })
    }


    function showModal(message) {
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
            $(".row").empty()
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
                                    <button type="button" class="btn btn-danger btn-defult delete-button" data-id="${items[i].id}">Delete</button>
                                </div>
        
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
            $(".row").append(productCard)
        }

    }

    function DeleteItem(event) {
        event.preventDefault();
        var id = $(this).attr("data-id")
        console.log("deleting")
        // console.log(product)
        $.ajax({
            method: "DELETE",
            url: "/api/products/" + id
        })
        .then(getProducts, showModal("Item Deleted!"))
    }


})



