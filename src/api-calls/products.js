const BASE_URL ='https://fakestoreapi.com/products'
export async function fetchAllProducts(){
try {
    const response = await fetch(BASE_URL)
    const resData = await response.json()
    console.log(resData)
    return resData
} catch (error) {
    console.log(error)
}
}