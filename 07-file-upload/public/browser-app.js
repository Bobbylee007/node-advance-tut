const url = "/api/v1/products";

const fileFormDOM = document.querySelector(".file-form");
const nameInputDOM = document.querySelector("#name");
const priceInputDOM = document.querySelector("#price");
const imageInputDOM = document.querySelector("#image");
const containerDOM = document.querySelector(".container");
const cardsDOM = document.querySelector(".cards");

let imageValue;

imageInputDOM.addEventListener("change", async (e) => {
  //anytime there is a change in this element we make a http call to send the element data to server
  const imageFile = e.target.files[0]; // get the target element
  const formData = new FormData(); // get the form data and invoke
  formData.append("image", imageFile); // parse the new file to formdata object 'image' as property name

  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${url}/uploads`, formData, {
      // look for src add the data to server
      headers: {
        "content-type": "multipart/form-data", //set the data headers
      },
    });
    imageValue = src; //add the scr from server to JS
  } catch (error) {
    imageValue = null; //set the image value null
    console.log(error);
  }
});

// send data to server
fileFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;

  try {
    const product = { name: nameValue, price: priceValue, image: imageValue }; //object to sent to server
    await axios.post(url, product); //http call to sent data to server
    showProducts(); //fetch send data to server to be display after data it sent
  } catch (error) {}
});

//retriving data from server
const showProducts = async () => {
  // loading is true
  try {
    //loading false

    // for return array of products
    //   const response = await axios.get(url);
    //   console.log(response); //full response
    //   console.log(response.data); // Get only data

    //   const products = response.data; //or  const products = response.data.products: for array like data
    //check if products is less then 1 then (no item)

    const {
      data: { products },
    } = await axios.get(url); //destructuring the data from response
    const productsDOM = products
      .map((product) => {
        const { image, price, name } = product;
        return `
          <article  class=card>
            <header>
            <img src='${image}'class='img' alt='${name}' />
            </header>

            <footer class='flex-contentInline'>
            <p>${name}</p>
            <p>${price}</p>
            </footer>
            </article>
            `;
      })
      .join("");
    cardsDOM.innerHTML = productsDOM;
  } catch(error){
    console.log(error);
  }
};
showProducts();
