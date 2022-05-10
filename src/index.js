/* global Reflect */

const callbackDefault =(type_error, valore)=>{return new this.#settings.type(value.concat(' ricevuto', valore));};

class EasyError{
  #settings;
  constructor(type_error, callback=undefined){
    checkConstructor(type_error, callback);
    this.#settings.type = type_error;
    this.#settings.callback = callback;
    return #returnProxy();
  }
  #returnProxy(){
    let callback;
    if(this.#settings.callback === undefined) callback = callbackDefault;
    else callback = this.#settings.callback;
    const handler = { get: (target, prop, receiver)=>{
                                let value = Reflect.get(...arguments);
                                return (valore, ...altri_args)=>{callback(valore, ...altri_args)};
                              },
                      set: (target, prop, value, receiver)=>{
                            //// inserire controllo se già definito, deve restituire errore e non settare
                            Reflect.set(...arguments);
                            return true;
                      }
                    };
    const EasyError = comandiEasyError;
    return new Proxy(EasyError, handler);
  }
}
function checkConstructor(...args){
  //if(typeof args[0] === 'function' && args[0].) /// da fare. cercare come controllare che la funzione in arg[0] abbia un constructor
  if(!(args[1] === undefined || typeof args[1] === 'function')) throw new TypeError(`la callback deve essere una funzione. Ricevuto ${args[1]}`);
}

function comandiEasyError(){
  /* eventuali metodi che si vogliono mettere a disposizione, es come list per avere la lista di tutti gli errori*/
}


  
module.exports = EasyError;
