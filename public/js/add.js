


$(document).ready(function () {

    $(".save").on("click", addItem)






    // initial products array

    // display products on site immediatelywhen page loads
    loadForm();





    // create card from product

    function loadForm() {
        $(".row").empty()

        const productCard =
            `    <div class="col-lg-4">
                <div class="card">
                    
                    <input type="text" class="form-control name" data-stock="" placeholder="Item Name" data-id="data-name">
                    
                    <div class="card-body">
                        <div class="form-group">
                            <form>
                                <input type="number" class="form-control price" placeholder="price without tax" data-id="data-price">
                                <input type="number" class="form-control qty" placeholder="qty" data-id="data-qty">
                                <input type="text" class="form-control department" placeholder="department" data-id="data-department">
                                <div class="col-sm-4">                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
        $(".row").append(productCard)


    }
    function showAddModal(message) {
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

    function addItem() {
        var newProduct = {
            name: $(`.name[data-id="data-name"]`).val(),
            price: $(`.price[data-id="data-price"]`).val(),
            stock: $(`.qty[data-id="data-qty"]`).val(),
            department: $(`.department[data-id="data-department"]`).val(),
        }
        $.post("/api/products", newProduct).then(showAddModal("Product Added!"))
            


    }





})



