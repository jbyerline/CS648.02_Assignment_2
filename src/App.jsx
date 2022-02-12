const div = document.getElementById('data');

function ProductTable(props) {
    const productRows = props.products.map((product) => {
        return (
            <ProductRow
                key={product.id} product={product}/>
        )
    });

    return (
        <table width="100%">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>ImageURL</th>
            </tr>
            </thead>
            <tbody>
            {productRows}
            </tbody>
        </table>
    );
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.addProduct;
        const product = {
            productName: form.productName.value,
            productPrice: form.productPrice.value,
            productCategory: form.productCategory.value,
            productImageUrl: form.productImageUrl.value,
        }
        this.props.createProduct(product);
        form.productName.value = "";
        form.productPrice.value = "$";
        form.productCategory.value = "";
        form.productImageUrl.value = "";
    }

    render() {
        return (
            <form name="addProduct" onSubmit={this.handleSubmit}>
                <h2>Add a new product to inventory</h2>
                <hr/>
                <div id="content">
                    <div id="left" align="left">
                        <div>
                            <p>Category</p>
                            <select id="list" name="productCategory">
                                <option value="Shirts">Shirts</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Jackets">Jackets</option>
                                <option value="Sweaters">Sweaters</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div>
                            <p>Price Per Unit</p>
                            <input type="text" name="productPrice" defaultValue="$"/>
                        </div>
                        <div>
                            <br/>
                            <button>Add Product</button>
                        </div>
                    </div>
                    <div id="right">
                        <div>
                            <p>Product Name</p>
                            <input type="text" name="productName"/>
                        </div>
                        <div>
                            <p>Image URL</p>
                            <input type="text" name="productImageUrl"/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

function ProductRow(props) {
    const product = props.product;
    return (
        <tr>
            <td>{product.productName}</td>
            <td>{product.productPrice}</td>
            <td>{product.productCategory}</td>
            <td><a href={product.productImageUrl} target="_blank">View</a></td>
        </tr>
    );

}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = {products: [],};
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({product: []});
        }, 500);
    }

    createProduct(product) {
        const productArr = this.state.products.slice();
        product.id = this.state.products.length + 1;
        productArr.push(product);
        this.setState({products: productArr});
    }

    render() {
        return (
            <div>
                <h1>My Company Inventory</h1>
                <h2>Showing all available products </h2>
                <hr/>
                <ProductTable products={this.state.products}/>
                <ProductAdd createProduct={this.createProduct}/>
            </div>
        );
    }
}


ReactDOM.render(<ProductList/>, div);
