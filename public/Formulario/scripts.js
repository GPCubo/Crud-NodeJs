const terms = document.getElementById("terms")
const form = document.getElementById("form");
const button = document.getElementById("button");
const inputs = document.querySelectorAll(".controls");

const campos = {
    name: false,
    lastname: false,
    mail: false,
    terms:false
};

const validateFormulario = (e) =>{
    switch(e.target.name){
        case "name":
            validarCampo(expresiones.nombre,e.target,"name");
        break;
        case "surname":
            validarCampo(expresiones.nombre,e.target,"lastname");
        break;
        case "email":
            validarCampo(expresiones.correo,e.target,"mail");
        break;
    }
};

const validarCampo = (expresion,input,campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`error__${campo}`).classList.remove(`error__${campo}-active`);
        campos[campo] = true
    }else {
        document.getElementById(`error__${campo}`).classList.add(`error__${campo}-active`);
        campos[campo] = false
    }
}

inputs.forEach((input) =>{
    input.addEventListener("change",validateFormulario);
    input.addEventListener("keyup",validateFormulario);
});

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

terms.addEventListener('change', (e) => {
    campos.terms = e.target.checked
    e.target.checked ? button.removeAttribute('disabled') : button.setAttribute('disabled', true)
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const datos = new FormData(form);
    const send = document.getElementById("sending")
    const formValues = Object.values(campos)
    const valid = formValues.findIndex(value => value == false)
    if(valid == -1){
        
        fetch("/add-public",{
            method:"POST",
            body: JSON.stringify({
                name: datos.get("name"),
                surname: datos.get("surname"),
                email: datos.get("email")
            }),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res => res.json())
        .then(data=>{
            if(data.ok){
                send.classList.add("sending"),
                setTimeout(()=>{
                location.reload()
            },1000)}
            else{
                send.classList.add("sending")
                send.textContent = "Ya este correo se ha registrado"
            }
        })
        
    }
})
