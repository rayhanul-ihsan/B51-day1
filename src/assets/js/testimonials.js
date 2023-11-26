// class Testimonial{
//     constructor(name, content, image){
//         this.image = image
//         this.content = content
//         this.name = name
//     }
    
//     html(){
//         return `
//         <div class="testimonial">
//                 <img src="${this.image}" class="profile" />
//                 <p class="content">"${this.content}"</p>
//                 <p class="name">- ${this.name}</p>
//         </div>
//         `
//     }
// }

// const testi1 = new Testimonial("ucok", "pekerjaan saya freelance", "https://i.ibb.co/S35PSkP/Peaky-Blinders-Cillian-Murphy-sends-the-internet-into-meltdown.jpg")
// const testi2 = new Testimonial("shally", "pekerjaan saya apt terkaya", "https://i.ibb.co/jrDRK7s/joelvalve-Ny-AX0-OTo-QWI-unsplash.jpg")
// const testi3 = new Testimonial("sambo", "pekerjaan saya supir", "https://i.ibb.co/gMz8Ywp/2020-HEAVENS-RUNO-360.jpg")

// const testimonials = [testi1, testi2, testi3];

// let testiHTML = ``;
// for(let i = 0; i < testimonials.length; i++){
//     testiHTML += testimonials[i].html()
// }

// document.getElementById("testimonials").innerHTML = testiHTML;

const testimoniData = [
    {
        name: "ucok",
        content:"Pekerjaan saya berburu",
        image: "https://i.ibb.co/S35PSkP/Peaky-Blinders-Cillian-Murphy-sends-the-internet-into-meltdown.jpg",
        rating: 5,
    },   
    {
        name: "perdy",
        content:"Pekerjaan saya freelance",
        image: "https://i.ibb.co/gMz8Ywp/2020-HEAVENS-RUNO-360.jpg",
        rating: 4
    },   
    {
        name: "shally",
        content:"Pekerjaan saya dokter",
        image: "https://i.ibb.co/jrDRK7s/joelvalve-Ny-AX0-OTo-QWI-unsplash.jpg",
        rating: 4
    },   
    {
        name: "sambo",
        content:"Pekerjaan saya polisi",
        image: "https://i.ibb.co/S35PSkP/Peaky-Blinders-Cillian-Murphy-sends-the-internet-into-meltdown.jpg",
        rating: 3
    },  
    {
        name: "deby",
        content:"Pekerjaan saya perawat",
        image: "https://i.ibb.co/jrDRK7s/joelvalve-Ny-AX0-OTo-QWI-unsplash.jpg",
        rating: 1
    }  
]

function allTestimoni(){
    let testiHTML = ``
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

function filterTestimoni(rating){
    let testiHTML =``
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
