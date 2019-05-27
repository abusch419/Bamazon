


$(document).ready(function () {

    $(".save").on("click", refreshProducts)
    





    // initial products array
    var products = []
    // display products on site immediatelywhen page loads
    getProducts();

    // when purchase button is clicked - check if item is out of stock or not


  


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
        $(".row").empty()
        for (let i = 0; i < items.length; i++) {
            const productCard =
                `    <div class="col-lg-4">
                <div class="card">
                    
                    <input type="text" class="form-control name" data-stock="" placeholder="${items[i].name}" data-id="${i}">
                    
                    <div class="card-body">
                        <div class="form-group">
                            <form>
                                <input type="number" class="form-control price" data-stock="" placeholder="${items[i].price}" data-id="${i}">
                                <input type="number" class="form-control qty" data-stock="" placeholder="${items[i].stock}" data-id="${i}">
                                <div class="col-sm-4">                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
            $(".row").append(productCard)
        }

    }


    function refreshProducts(event) {
        event.preventDefault();
        $.get("/api/products", function (data) {
            products = data;
            console.log()
            $(".row").empty()
            updateItems(products)
        })
    }

    function updateItems(items) {
        console.log("before the loop")
        for (let i = 0; i < items.length; i++) {
            var newProduct = {
                id: items[i].id,
                name: items[i].name = $(`.name[data-id="${i}"]`).val(),
                price: $(`.price[data-id="${i}"]`).val(),
                stock: $(`.qty[data-id="${i}"]`).val()
            }
            console.log(newProduct)
            $.ajax({
                method: "PUT",
                url: "/api/products/",
                data: newProduct
            }).then(createCard(products))

        }
        
        
        
      }

})



