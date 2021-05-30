export default function deletePerson () {
    const firstnameInput = document.getElementById('firstnameInput');
    const lastnameInput = document.getElementById('lastnameInput');
    const ageInput = document.getElementById('ageInput');
    const cityInput = document.getElementById('cityInput');
    const phonenumberInput = document.getElementById('phonenumberInput');
    const emailInput = document.getElementById('emailInput');
    const companynameInput = document.getElementById('companynameInput');
    const updateData = document.getElementById('update');
    const createData = document.getElementById('create');
    createData.disabled = false;
    updateData.disabled = true;

    const table = document.getElementById('table');
    const tbodytr = document.querySelectorAll('.tbody__tr');
    let selectedTR = null;
    const selectedClass = 'selected';

    table.addEventListener('click', function(e) {
        const targetTr = e.target.closest('tr');
        if (targetTr) {
            tbodytr.forEach(trElement => {
                if (trElement === targetTr) {
                    if (trElement.classList.contains(selectedClass)) {
                        trElement.classList.remove(selectedClass);
                        selectedTR = null;
                        createData.disabled = false;
                        updateData.disabled = true;                    
                        clearInputs({
                            firstName: firstnameInput,
                            lastName: lastnameInput,
                            age: ageInput,
                            city: cityInput,
                            phoneNumber: phonenumberInput,
                            email: emailInput,
                            companyName: companynameInput
                        });
                    } else {   
                        selectedTR = trElement;
                        trElement.classList.add(selectedClass);
                    }
                } else {
                    trElement.classList.remove(selectedClass);
                }
            })
        } 
    })
    
    table.addEventListener('dblclick', function(e) {
        createData.disabled = true;
        updateData.disabled = false;
        const targetTr = e.target.closest('tr');
        if (targetTr) {
            const dataFirstName = targetTr.querySelector('.td-firstName');
            const dataLastName = targetTr.querySelector('.td-lastName');
            const dataAge = targetTr.querySelector('.td-age');
            const dataCity = targetTr.querySelector('.td-city');
            const dataPhoneNumber = targetTr.querySelector('.td-phoneNumber');
            const dataEmail = targetTr.querySelector('.td-email');
            const dataCompanyName = targetTr.querySelector('.td-companyName');
            
            firstnameInput.value = dataFirstName.textContent;
            lastnameInput.value = dataLastName.textContent;
            ageInput.value = dataAge.textContent;
            cityInput.value = dataCity.textContent;
            phonenumberInput.value = dataPhoneNumber.textContent;
            emailInput.value = dataEmail.textContent;
            companynameInput.value = dataCompanyName.textContent;
        }
    })
}    
export function clearInputs (params) {
        const { firstName, lastName, age, city, phoneNumber, email, companyName } = params;
        firstName.value = '';
        lastName.value = '';
        age.value = '';
        city.value = '';
        companyName.value = '';
        email.value = '';
        phoneNumber.value = '';
    }
