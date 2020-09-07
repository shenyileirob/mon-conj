var db;
var xhrmode = 1;

loadDoc();

function loadDoc() {
	if(xhrmode){
		console.log('111');
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log('444');
				compile_dict(this);
			}
		};
		console.log('222');
		xhttp.open("GET", "dict.txt", true);
		xhttp.send();
		console.log('333');
	}
	else{compile_dict(null);}
}

function compile_dict(xhttp) {
	console.log('555');
	var i;
  
	if(xhrmode){
		var text_dict = xhttp.response;
	}
	else{
		var text_dict = 'ᡄᡄᡅᡅᠪᡄᡅᡅᡍᡇ‌	ʔaibai×+	æːbɪːx\r\nᡄᡄᡅᡅᠪᡄᠯᡔᡄᡍᡇ‌	ʔaibalǰa×+	æːbɑ̆lʤɪx\r\nᡄᡄᡅᡅᠪᡆᠷᠯᡄᡍᡇ‌	ʔaiburla×+	æːbɑ̆rlɑ̆x\r\nᡄᡄᡅᡅᡍᡇ‌	ʔai×+	æːx\r\nᡄᡄᡅᡅᡎᡆᡆᡄᡍᡄᡍᡇ‌	ʔaigudxa×+	æːɡʊːtɡɑ̆x\r\nᡄᡄᡅᡅᡏᡄᡍᡇ‌	ʔaima×+	æːmɑ̆x\r\nᡄᡄᡅᡅᡏᡄᡍᠯᡄᡍᡇ‌	ʔaimagla×+	æːmɑ̆ɡlɑ̆x\r\nᡄᡄᡅᡅᡏᡄᡍᠴᡅᠯᡄᡍᡇ‌	ʔaimagčila×+	æːmɑ̆ɡʧlɑ̆x\r\nbbb‌	ʔaimas×+	æːmsɑ̆x\r\nᡄᡄᡅᡅᡏᡆᠷᡍᡇ‌	ʔaimur×+	æːmrɑ̆x\r\nᡄᡄᡅᡅᡏᡆᠷᠯᡄᡍᡇ‌	ʔaimurla×+	æːmɑ̆rlɑ̆x\r\nᡄᡄᡅᡅᠯᡄᡆᡄᡍᡄᡍᡇ‌	ʔailadxa×+	æːltɡɑ̆x\r\nᡄᡄᡅᡅᠯᡄᡆᡄᡍᡇ‌	ʔailad×+	æːldɑ̆x\r\nᡄᡄᡅᡅᠯᡆᡍᠯᡄᡍᡇ‌	ʔailugla×+	æːlɑ̆ɡlɑ̆x\r\nᡄᡄᡅᡅᠯᡎᡄᡍᡇ‌	ʔailga×+	æːlɡɑ̆x\r\nᡄᡄᡅᡅᠯᠰᡄᡍᡇ‌	ʔailsa×+	æːlsɑ̆x\r\nᡄᡄᡅᡅᠯᠰᡅᡍᡇ‌	ʔailsi×+	æːlʃɪx\r\nᡄᡄᡅᡅᠯᠴᡅᠯᡄᡍᡇ‌	ʔailčila×+	æːlʧlɑ̆x\r\nᡄᡄᡅᡅᠰᡆᡍᡇ‌	ʔaisu×+	æːsɑ̆x\r\nᡄᡄᡅᡅᡑᡄᡄᡘᡎᡆᡅᡅᠯᡄᡍᡇ‌	ʔaidaŋguila×+	æːdɑ̆ŋɡʊɪlɑ̆x';
	}
	var entries = text_dict.split(/[\r\n]+/);

	
	//prefixes of implementation that we want to test
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	//prefixes of window.IDB objects
	window.IDBTransaction = window.IDBTransaction || 
	window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

	if (!window.indexedDB) {
		window.alert("Your browser doesn't support a stable version of IndexedDB.")
	}


	//var db;
	//	console.log(window.indexedDB);
	console.log('701');

	var request = window.indexedDB.open("newDatabase", 1);

	request.onerror = function(event) {
		console.log("error: ", request.error.name);
	};

	request.onsuccess = function(event) {
		db = request.result;
		console.log("success: 709"+ db);
	};

	request.onupgradeneeded = function(event) {
		
		try {
			var request = window.indexedDB.deleteDatabase("newDatabase");
		}
		catch(err) {
		}
		
		console.log('710');
		db = event.target.result;
		console.log('711');
		var objectStore = db.createObjectStore("lexeme", {keyPath: "id", autoIncrement: true});
		console.log(objectStore);
		var titleIndex = objectStore.createIndex("by_graph", "graph", {unique: false});
		console.log('712');
		
		for (i = 0; i < entries.length; i++) {
			var items = entries[i].split("\t");
			objectStore.add({ id: i, graph: items[0], xlit: items[1], phone: items[2] });
		}
		console.log(db);

		// lookup_by_graph ('ᡄᡄᡅᡅᡏᡄᡍᠴᡅᠯᡄᡍᡇ')
		console.log('714');
	}
}

function lookup_by_graph (graph) {
	console.log(db);
	console.log(graph);

	try {
		var tx = db.transaction(["lexeme"], "readonly");
	}
	catch(err) {
	}
	
	console.log(tx);
	var store = tx.objectStore("lexeme");
	var index = store.index("by_graph");

	var request = index.openCursor(IDBKeyRange.only(graph));
	console.log('715');
	innerHTML = '';
	
	request.onsuccess = function() {
		var cursor = request.result;
		
		if (cursor) {
		// Called for each matching record.
		innerHTML += cursor.value.graph + ' '
			+ "<span class='IPA'>(" + "<span class='xlit'>" + cursor.value.xlit + "</span>" + ' /'
			+ cursor.value.phone + "/)</span>" + '<br>';
		cursor.continue();
		}
		else {  }
		
		console.log('716:', innerHTML);
		document.getElementById("lemmas").innerHTML = innerHTML;
		//return innerHTML;
	};
}
