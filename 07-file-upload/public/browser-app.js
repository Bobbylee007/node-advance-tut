const url='api/v1/products'

const fileFormDOM = document.querySelector('./file-form')

const nameInputDOM = document.querySelector("#price");
const priceInputDOM = document.querySelector("#price");
const imageInputDOM = document.querySelector("#image");

const containerDOM = doucment.querySelector('.container')

let imageValue;

// imageInputDOM.addEventListener('change', (e)=>{
//     const file =e.target.file[0]
//     console.log(file);
    
// })

//retriving data from server

const fetchproducts = async(url)=>{
const itemData = await axios.get(url)
console.log(itemData);
}


imageInputDOM.addEventListener('change', (e)=>{ //anytime there is a change in this element we make a http call to send the element data to server
    const file = e.target.file[0]                // get the target element
   const formData = new FormData()              // get the form data and invoke
   formData.append('image', imageFile)          // parse the new file to formdata object 'image' as property name
    
   try {
    const {data:{image:{src}}} =await axios.post(`${url}/uploads`, formData,{   // look for src add the data to server
        headers:{
            'content-type':'multipart/form-data'    //set the data headers
        }
    })
    imageValue = src                                //add the scr from server to JS
   } catch (error) {
    imageValue = src                                //set the image value null
    imageValue = null                               
    console.log(error);
   }
})

// send data to server
fileFormDOM.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const nameValue = nameInputDOM.value
    const priceeValue = priceInputDOM.value
   
    try {
        const product = {name:nameValue,priceeValue,image:imageValue} //object to sent to server

        await axios.post(url, product)  //http call to sent data to server
        fetchproducts()                 //fetch send data to server to be display after data it sent
    } catch (error) {
        
    }

})

