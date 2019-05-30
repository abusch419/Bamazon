


$(document).ready(function () {

    $(".save").on("click", addItem)

    loadForm();

    // creates product add form when the page loads

    function loadForm() {
        $(".card-row").empty()

        const productCard =
            `    <div>
                <div class="card">
                    <input type="text" class="form-control name" data-stock="" placeholder="Item Name" data-id="data-name">
                    <div class="card-body">
                        <div class="form-group row">
                            <form class="row">
                                <input type="number" class="form-control price col-12" placeholder="price without tax" data-id="data-price">
                                <input type="number" class="form-control col-12 qty" placeholder="qty" data-id="data-qty">
                                <input type="text" class="form-control col-12 department" placeholder="department" data-id="data-department">
                                <input type="text" class="form-control col-12 imgUrl" placeholder="ImgUrl" data-id="data-image">
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
        $(".card-row").append(productCard)
    }

    // show modal when product is added

    function showAddModal(message) {
        var modal = ` <div id="purchaseModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
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

    // adds item to database

    function addItem() {
        var newProduct = {
            name: $(`.name[data-id="data-name"]`).val(),
            price: $(`.price[data-id="data-price"]`).val(),
            stock: $(`.qty[data-id="data-qty"]`).val(),
            department: $(`.department[data-id="data-department"]`).val(),
            imgUrl: $(`.imgUrl[data-id="data-image"]`).val(),
        }
        $.post("/api/products", newProduct).then(showAddModal("Product Added!"))
    }
})



