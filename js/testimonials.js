class Testimonial{
    constructor(name, content, image){
        this.image = image
        this.content = content
        this.name = name
    }
    
    html(){
        return `
        <div class="testimonial">
                <img src="${this.image}" class="profile" />
                <p class="content">"${this.content}"</p>
                <p class="name">- ${this.name}</p>
        </div>
        `
    }
}

const testi1 = new Testimonial("ucok", "pekerjaan saya freelance", "https://i.ibb.co/S35PSkP/Peaky-Blinders-Cillian-Murphy-sends-the-internet-into-meltdown.jpg")
const testi2 = new Testimonial("shally", "pekerjaan saya apt terkaya", "https://i.ibb.co/jrDRK7s/joelvalve-Ny-AX0-OTo-QWI-unsplash.jpg")
const testi3 = new Testimonial("sambo", "pekerjaan saya supir", "https://i.ibb.co/gMz8Ywp/2020-HEAVENS-RUNO-360.jpg")

const testimonials = [testi1, testi2, testi3];

let testimonialHTML = ``;
for(let i = 0; i < testimonials.length; i++){
    testimonialHTML += testimonials[i].html()
}

document.getElementById("testimonials").innerHTML = testimonialHTML;
