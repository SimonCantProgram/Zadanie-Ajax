let method = 'GET';
//let url = 'http://edu.gplweb.pl/res/web-app-ajax/test.txt';
//let url = 'http://localhost/TAI_AJAX_3/test.txt';
let url = 'http://localhost/tai/firma.json';
let data = 'null';

let getBundle = ()=> {
	console.log('Hello AJAX');
	//stworzenie obiektu do komunikacji
	const xhr = new XMLHttpRequest();
	//ustawienie formatu danych Odpowiedzi
	xhr.responseType = 'json'; //domyślny: text
	//formaty: {text,arraybufer,blob,document,json}
	//skonfigurowanie połączenia
	xhr.open(method,url,async=true);//login, passwd - mozna dodac
	xhr.send();//wysłanie połączenia
	console.log(xhr.response);

	//.. wymagany nasłuch zdarzenia (zmiany statusu połączenia)
	xhr.addEventListener('readystatechange',(e)=>{
		if(xhr.readyState!==4){
			console.log(xhr.readyState);
		}
		if(xhr.readyState===4){
			if(xhr.status===200){ //otrzymano zasób
				console.log('Są kalesonki są');
				console.log(xhr);
			}
			if(xhr.status===404){
				console.log('zasób nieodnaleziony')
			}
			if(xhr.status===500){
				//mozliwa wieksza awaria
				console.log('serwer odpadł')
			}
			if(xhr.status===503){
				//sprobuj za kilka chwila
				console.log('Retry in... 3,2,1...')
			}
		}
	});
	//nasłuchuje obiektu XHR kiedy odbierze dokument
	xhr.addEventListener('load',(e)=>{
		console.log(xhr.response);
		data = xhr.response;
		if(data!==null){
			let i = 1;
			let timeInt = 1000;
			console.log(i);
			let t1 = setInterval( function(){
				if(i===data.length-1)
					clearInterval(t1);
				insItem(i++,data[i]);
			}, timeInt);
			//data.forEach(item => insItem(i++,item));
			//wywołanie metody setStatusBar();
		}
	});
}
let insItem = (i, item)=>{
	let main = document.querySelector('#main');
	let tpl = document.querySelector('#rowTplt');
	let r2 = tpl.content.cloneNode(true);
	let rid = r2.querySelector('#row-');
		rid.id = rid.id+i;//<div id="row-1" -2 -3...
	cells = r2.querySelectorAll('p');
	cells[0].textContent = i;
	cells[1].textContent = item.imie;
	cells[2].textContent = item.nazwisko;
	cells[3].textContent = i.stanowisko;
	main.appendChild(r2);
	//addNavItem(i); // uzupełnia menu nawigacyjne znacznikami A href = "row-1" -2 -3...
}
window.addEventListener('load',getBundle,false);