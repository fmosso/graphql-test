const promesa = new Promise((resolve, reject) => {
    resolve(false);
});
promesa.then();
console.log(promesa);
