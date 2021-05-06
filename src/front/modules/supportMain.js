// export function openPopup (element) {
//     element.classList.remove('hideCreatePopup');
// }
// export function closePopup(element, input) {
//     element.classList.add('hideCreatePopup');
//     clearInputs(input);
// }
// export function exitOnEscape(event, element, input) {
//     if (event.keyCode === 27) {
//       closePopup(element);
//       clearInputs(input);
//     }
// }
// export function handlePopupClick(event, element) {
//     if (event.target === element) {
//       closePopup(element);
//     }
// }
// export function clearInputs (input) {
//     if (!input) {
//         return;
//     }
//     for (let i of input) {
//         i.value = '';
//     }
// }
// export function changeType (input) {
//     input.forEach((i) => {
//         if (i.type === 'password') {
//             i.type = 'text';
//         } else if (i.type = 'text') {
//             i.type = 'password';
//         }
//     })
// }