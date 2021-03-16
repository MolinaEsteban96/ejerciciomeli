/*REQUERIMOS LOS MODULOS NECESARIOS*/

const Fetch = require("node-fetch");
const Prompt = require("prompt");
const fs = require("fs");

/*EL USUARIO UTILIZARA PROMPT PARA PEDIR POR CONSOLA EL ID DEL VENDEDOR AL QUE QUIERE BUSCAR*/

Prompt.start();

Prompt.get("sellerID", async function (err, result) {

    if (err) {await console.log("Error! No se pudo ingresar los requirimientos")}

    var items = [];

    /*REQUERIMOS TODOS LOS PRODUCTOS MEDIANTE FETCH*/
    try {

        await Fetch('https://api.mercadolibre.com/sites/MLA/search?seller_id='+ result.sellerID, {

        Headers : {'Authorization' : 'Bearer TG-604d654d71a616000d3be0e6-269620469'}

        })
        .then(res => res.json())
        .then(data => items = [data])

        var itemlist = []

        itemlist = items[0].results;
        
    }catch (err){console.log(err)}
    

    /*ITERAMOS CADA PRODUCTO EN LA LISTA, REQUERIMOS MEDIANTE FETCH EL NOMBRE DE LA CATEGORIA Y ESCRIBIMOS EN UN ARCHIVO
    LOG TODOS LOS DATOS RELEVANTES DEL PRODUCTO*/

    await itemlist.forEach(async element => {

        var category_name;

        await Fetch("https://api.mercadolibre.com/categories/" + element.category_id)
            .then(res => res.json())
            .then(data => category_name = data)

        await fs.appendFile(result.sellerID + "_LOG.txt","\n" + "id: " + element.id + "\n" 
            + "Titulo: " + element.title + "\n"
            + "Categoria: " + element.category_id + "\n"
            + "Nombre categoria: " + category_name.name + "\n"
            , function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    })

    

})
