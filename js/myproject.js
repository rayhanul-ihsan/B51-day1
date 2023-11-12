
const data = [];

function submitData(event) {
  event.preventDefault()
  //datadiri
  let Project = document.getElementById("name").value
  let image = document.getElementById("myFile").files
  let description = document.getElementById("description").value
  const start = document.getElementById('start').value 
  const end = document.getElementById('end').value 
  
  //data sosmed
  const linked = document.getElementById('linked').checked;
  const fb = document.getElementById('fb').checked;
  const ig = document.getElementById('ig').checked;
  const twitt = document.getElementById('twitt').checked;

  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  
  
  const duration = endDate - startDate;
  console.log(duration);
  const durationMonth = Math.round(duration / (1000*60000*45));

  image = URL.createObjectURL(image[0])

  const obj = {
    Project,
    image,
    description,
    durationMonth,
    linked,
    fb,
    ig,
    twitt,
  }

  data.push(obj)
  renderMyproject()
}



function renderMyproject() {
  document.getElementById("contents").innerHTML = ""

  for(let i = 0; i < data.length; i++) {
    const socialMediaIcons = [];

    if (data[i].linked){
      socialMediaIcons.push(`<img src="./assets/linkedin.svg" alt="linkedin"></img>`);
    }
    if (data[i].ig){
      socialMediaIcons.push(`<img src="./assets/instagram.svg" alt="instagram"></img>`);
    }
    if (data[i].fb){
      socialMediaIcons.push(`<img src="./assets/facebook.svg" alt="facebook"></img>`);
    }
    if (data[i].twitt){
      socialMediaIcons.push(`<img src="./assets/twitter.svg" alt="twitter"></img>`);
    }
    

    document.getElementById("contents").innerHTML += `
  <div class="project">
      <div class="project-image">
        <img src="${data[i].image}" alt="">
      </div>
    <div>
        <h3>
            <a href="./my-project-detail.html" target="_blank"></a>${data[i].Project}</h3>
        <p style="font-size: 14px; color: #5d5c5c; margin-top: -10px;">durasi : ${data[i].durationMonth} bulan</p>
    </div>
    <div class="project-p">
        <p>${data[i].description}</p>
    </div>

    <div class="social-media-icons">
          ${socialMediaIcons.join(' ')}
    </div>
      
    <div class="btn">
        <table>
            <tr>
                <td><button class="btn-edit">edit</button></td>
                <td><button class="btn-delete">delete</button></td>
            </tr>
        </table>
    </div>
  </div>`
  }
}




