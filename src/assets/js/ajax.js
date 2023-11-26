const data = new Promise((myResolve, myReject) =>{
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.npoint.io/ce5d5929ace79426d3cf', true)
    xhr.onload = () => {
        if (xhr.status == 200){
            myResolve(JSON.parse(xhr.response))
        } else {
            myReject('Internal server error')
        }
    }

    xhr.onerror = () => {
        myReject('Network Error')
    }
    xhr.send()
})

async function allTestimoni(){
    let testiHTML = ``
    const testimoniData = await data
    testimoniData.forEach((item)=> {
    testiHTML += `<div class="testimonial">
        <img src="${item.image}" class="profile" />
        <p class="content">"${item.content}"</p>
        <p class="name">- ${item.name}</p>
        <p class="name">${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>`
})
document.getElementById("testimoni").innerHTML = testiHTML
}

allTestimoni()

async function filterTestimoni(rating){
    let testiHTML =``
    const testimoniData = await data
    const testimoniFiltered = testimoniData.filter((item)=>{
        return item.rating == rating
    })
    if (testimoniFiltered.length == 0) {
        testiHTML =`<h3> data not found </h3>`
    } else {
        testimoniFiltered.forEach((item)=> {
            testiHTML += `<div class="testimonial">
                <img src="${item.image}" class="profile" />
                <p class="content">"${item.content}"</p>
                <p class="name">- ${item.name}</p>
                <p class="name">${item.rating} <i class="fa-solid fa-star"></i></p>
            </div>`
        })
    }
    
    document.getElementById("testimoni").innerHTML = testiHTML
}
