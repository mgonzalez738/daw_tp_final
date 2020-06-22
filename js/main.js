class ViewMainPage {
    constructor(myf) {
        this.myf = myf;
    }
    showDevices(list) {
        // cargo la lista de objetos en el DOM
        let devicesUl = this.myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1")
                checkedStr = "checked";
            switch (list[i].type) {
                case 0: // Lampara                     
                    items += "<li class='collection-item avatar'> \
                                <img src='images/lightbulb.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
                case 1: // Persiana                    
                    items += "<li class='collection-item avatar'> \
                                <img src='images/window.png' alt='' class='circle'> \
                                <span class='title'>" + list[i].name + "</span> \
                                <p>" + list[i].description + "<br> \
                                </p> \
                                <a href='#!' class='secondary-content'> <div class='switch'> \
                                                                            <label> \
                                                                            Off \
                                                                            <input type='checkbox' id='dev_" + list[i].id + "' " + checkedStr + "> \
                                                                            <span class='lever'></span> \
                                                                            On \
                                                                            </label> \
                                                                        </div></a> \
                            </li>";
                    break;
            }
        }
        devicesUl.innerHTML = items;
    }
    getSwitchStateById(id) {
        let el = this.myf.getElementById(id);
        return el.checked;
    }
}
class Main {
    handleEvent(evt) {
        let el = this.myf.getElementByEvent(evt);
        let elTodos = this.myf.getElementById("todos");
        let elLamparas = this.myf.getElementById("lamparas");
        let elPersianas = this.myf.getElementById("persianas");
        console.log("click en device:" + el.id);
        // Detecta si el elemento clickeado es un filtro o switch
        if (el.id.toString() == "todos") {
            elTodos.parentElement.className = "active";
            elLamparas.parentElement.className = "";
            elPersianas.parentElement.className = "";
            this.myf.requestGET("devices?filter=0", this);
        }
        else if (el.id.toString() == "lamparas") {
            elTodos.parentElement.className = "";
            elLamparas.parentElement.className = "active";
            elPersianas.parentElement.className = "";
            this.myf.requestGET("devices?filter=1", this);
        }
        else if (el.id.toString() == "persianas") {
            elTodos.parentElement.className = "";
            elLamparas.parentElement.className = "";
            elPersianas.parentElement.className = "active";
            this.myf.requestGET("devices?filter=2", this);
        }
        else {
            let data = { "id": el.id, "state": this.view.getSwitchStateById(el.id) };
            this.myf.requestPOST("devices", data, this);
        }
    }
    handleGETResponse(status, response) {
        if (status == 200) {
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
            this.view.showDevices(data);
            for (let i in data) {
                let sw = this.myf.getElementById("dev_" + data[i].id);
                sw.addEventListener("click", this);
            }
        }
    }
    handlePOSTResponse(status, response) {
        if (status == 200) {
            console.log(response);
        }
    }
    main() {
        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);
        this.myf.confiClick("todos", this);
        this.myf.confiClick("lamparas", this);
        this.myf.confiClick("persianas", this);
        this.myf.requestGET("devices?filter=0", this);
    }
}
window.onload = () => {
    let obj = new Main();
    obj.main();
};
