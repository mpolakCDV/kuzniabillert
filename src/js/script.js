const footerYear = document.querySelector('.footer__year')
const burgerBtn = document.querySelector('.nav__btn-burger')
const xBtn = document.querySelector('.nav__btn-x')
const navMobile = document.querySelector('.nav__mobile')
const navLinks = document.querySelectorAll('.nav__mobile-link')
const msgStatus = document.querySelector('.msg-status')
const form = document.querySelector('.contact__form')
let statusText = document.querySelector('.contact__info')

const handleNav = () => {
    navMobile.classList.toggle('nav__mobile--active')

    navLinks.forEach(item => {
        item.addEventListener('click', () => {
            navMobile.classList.remove('nav__mobile--active')
        })
    })
    
    handleNavItemsAnimation();
}

const handleNavItemsAnimation = () => {
	let delayTime = 0;

	navLinks.forEach((item) => {
		item.classList.toggle("nav-items-animation");
		item.style.animationDelay = "." + delayTime + "s";
		delayTime++;
	});
};

const handleCurrentYear = () => {
    const year = new Date().getFullYear()
    footerYear.innerText = year
}

handleCurrentYear()

burgerBtn.addEventListener('click', handleNav)
xBtn.addEventListener('click', handleNav)

form.onsubmit = (e) => {
    e.preventDefault()
    statusText.style.color = '#fff'
    statusText.style.display = 'block'
	statusText.innerText = "Wysyłanie..."
	form.classList.add("disabled")

    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'message.php', true)
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let response = xhr.response
            if(response.indexOf("Pole email i wiadomość są wymagane!") != -1 || response.indexOf("Wprowadź poprawny adres email!") || response.indexOf("Błąd przy wysyłaniu wiadomości!")) {
                statusText.style.color = '#aa3848'
            } else {
                form.reset()
                setTimeout(() => {
                    statusText.style.display = 'none'
                }, 3000)
            }
            statusText.innerText = response
			form.classList.remove("disabled")
        }
    }
    let formData = new FormData(form)
    xhr.send(formData)
}
