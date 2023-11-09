function submitData(){
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    if(name == ""){
        alert("Nama harus di isi")
    } else if(email == ""){
        alert("Email harus di isi")
    } else if(phone == ""){
        alert("phone number harus di isi")
    } else if(subject == ""){
        alert("Subject harus di isi")
    } else if(message == ""){
        alert("your message harus di isi")
    }else{

        // const emailReceiver = "mrayhanulihsan@gmail.com"
        // let a = document.createElement('a')
        // a.href = `mailto:${emailReceiver}?subject=${subject}&body= hi nama saya ${name}, 
        // jika anda berkenan bisa hubungi saya ${phone}, untuk membahas bisnis ${message}`
        
        const emailReceiver = "mrayhanulihsan@gmail.com";
        const mailtoLink = `mailto:${emailReceiver}?subject=${subject}&body=Hi, nama saya ${name}, 
        jika anda berkenan bisa hubungi saya di ${phone} untuk membahas bisnis. ${message}`;
        
        window.location.href = mailtoLink;

        // let a = document.createElement('a')
        // a.href = `mailto:${email}?subject=${subject}&body=Hi, nama saya ${name}, 
        // jika anda berkenan bisa hubungi saya di ${phone} untuk membahas bisnis ${message}`
        // a.click()

        let data ={
            name,
            email,
            phone,
            subject,
            message
        }
        console.log(data)
    }

}