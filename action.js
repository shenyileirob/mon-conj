function get(id){
	return document.getElementById(id);
}

// get("info_enable_js").style.display = "none";
get("sidenav").style.display = "table";
get("content").style.display = "table";
function localize_ui(lan){
	console.log('checked:', lan);
	switch (lan) {
	case "zh":
		console.log('branch:', 'zh');
		get("label_cb_xlithint").innerHTML = "帮助";
		get("header_conj").innerHTML = "屈折器";
		get("header_deconj").innerHTML = "逆屈折器";
		get("label_cb_chn").innerHTML = "中国";
		get("label_cb_infer_gender").innerHTML = "推测阴阳性";
		get("label_cb_dict").innerHTML = "启用词典";
		get("label_cb_bare_stem").innerHTML = "接受秃词干";
		get("input_cell").placeholder = "目标形";
		get("input_lemma").placeholder = "词典形";
		get("input_wordform").placeholder = "屈折形";
		get("input_cell_pinyin").placeholder = "目标形（拼音）";
		get("input_lemma_pinyin").placeholder = "词典形（拼音）";
		get("input_wordform_pinyin").placeholder = "屈折形（拼音）";
		break;
	default:
		console.log('branch:', 'default');
		get("label_cb_xlithint").innerHTML = "Help";
		get("header_conj").innerHTML = "Conjugator";
		get("header_deconj").innerHTML = "Deconjugator";
		get("label_cb_chn").innerHTML = "CHN";
		get("label_cb_infer_gender").innerHTML = "infer gender";
		get("label_cb_dict").innerHTML = "use dictionary";
		get("label_cb_bare_stem").innerHTML = "accept bare stems";
		get("input_cell").placeholder = "Target";
		get("input_lemma").placeholder = "Lemma";
		get("input_wordform").placeholder = "Wordform";
		get("input_cell_pinyin").placeholder = "Target (pinyin)";
		get("input_lemma_pinyin").placeholder = "Lemma (pinyin)";
		get("input_wordform_pinyin").placeholder = "Wordform (pinyin)";
		break;
	}
}
localize_ui('en');
var parad = ['ᠪᡄᡅᡅᡍᡇ‌', 'ᠪᡄᡅ', 'ᠪᡄᡅᡅᡊᡃ', 'ᠪᡄᡅᡅᠪᡄᠯ', 'ᠪᡄᡅᡅᡍᡄᠷ', 'ᠪᡄᡅᡅᡑᡄᡍ', 'ᠪᡄᡅᡅᡔᡅ'];
var suffix_lists = [
	['ᡄ', 'ᡄᡘᡍᡄᡄ', 'ᡏᡄᡄ', 'ᡍᠰᡄᡄ', 'ᡊᡄᠷᡄᡄ', 'ᠯᡄᠷᡄᡄ', 'ᡏᡄᡄᡔᡅᡄ', 'ᡏᡄᡔᡅᡄ', 'ᡎᡄᡆᡄ', 'ᡍᡑᡆᡄ', 'ᠷᡆᡄ', 'ᠪᡄ', 'ᠯᡎᡃ', 'ᡄᡘᡎᡆᡑᡄ', 'ᡍᡆᡅᡅᠴᡄ', 'ᡏᡄᡍᠴᡄ', 'ᡅᡃ', 'ᡍᡆᡅᡃ', 'ᡊᡃ', 'ᡍᡆᡊᡃ', 'ᡎᡃ', 'ᠯᡆᡎᡃ', 'ᡄᡘᡎᡃ', 'ᡏᡃ', 'ᠯᡃ', 'ᡑᡄᠯᡃ', 'ᡍᡆᠯᡃ', 'ᠷᡃ', 'ᠪᡄᡅ', 'ᠰᡆᡎᡄᡅ', 'ᡑᡆᡎᡄᡅ', 'ᠯᡄᡅ', 'ᡎᡄᠰᡄᡅ', 'ᠰᡅᡑᡄᡅ', 'ᡎᡆᠰᡅᡑᡄᡅ', 'ᠯᡑᡄᡅ', 'ᡔᡄᡅ', 'ᡎᡆᡔᡄᡅ', 'ᡎᡄᠷᡄᡅ', 'ᡍᡆᡅ', 'ᡔᡆᡍᡆᡅ', 'ᡏᡆᡅ', 'ᡎᡄᡑᡆᡅ', 'ᡎᡄᠴᡅ', 'ᡏᡄᡅᡅᠴᡅ', 'ᡍᠴᡅ', 'ᡔᡅ', 'ᡍᡇ‌', 'ᡏᡇ‌', 'ᠰᡇ‌', 'ᠪᡄᠰᡇ‌', 'ᠪᡄᠴᡇ‌', 'ᡕᡄᠴᡇ‌', 'ᡔᡇ‌', 'ᡕᡇ‌', 'ᡍ', 'ᡑᡄᡍ', 'ᡊᡄᡏ', 'ᠪᡄᠯ', 'ᡍᡆᡊᡄᠷ', 'ᡍᡄᠷ', 'ᡍᠰᡄᡎᡄᠷ', 'ᡏᡄᠷ', 'ᡍᡆᠯᡄᠷ', 'ᠯᡑᡄ', 'ᠰᡅ', 'ᠯ', ''],
	['ᡔᡄᡊᡄᡍᡇ‌', 'ᡎᡄᡑᡄᡍᡄᡍᡇ‌', 'ᠴᡅᡍᡄᡍᡇ‌', 'ᠪᡘᡅᡍᡇ‌', 'ᠰᡘᡅᡘᡆ', 'ᠴᡅᡍᡇ‌'],
	['ᠯᡎᡄᡍᡇ‌', 'ᡎᡆᠯᡍᡇ‌'],
	['ᡑᡄᡍᡇ‌', 'ᡍᡑᡄᡍᡇ‌', 'ᠯᠴᡄᡍᡇ‌', 'ᡎᡄᡍᡇ‌', 'ᠴᡄᡎᡄᡍᡇ‌', 'ᡔᡄᡎᡄᡍᡇ‌', 'ᠯᡎᡄᡍᡇ‌', 'ᠯᡑᡆᡍᡇ‌', 'ᡎᡆᠯᡍᡇ‌']
];
refresh_TEXT_conj_wordform();
// console.log(['qwertyuiop', 'asdfghjkl']);
// console.log('finally:',set([1, 2, 3, 4, 3, 3, 4, 2, 1]));
refresh_LB_deconj_lemma();
get("if_dict").checked = 1; // putting this before the previous line would cause the lemma to miss init when the dict is not ready
get("if_infer_mf").disabled= true;
get("if_bare_stem").disabled= true;

function toggle_xlithint()
{
	if(get("cb_xlithint").checked)
	{
		get("tb_xlithint").style.display = "table";
	}
	else
	{
		get("tb_xlithint").style.display = "none";
	}
}
function refresh_LB_deconj_lemma()
{
	console.log('refresh_LB_deconj_lemma');
	var wordform = pinyin2graph(get("input_wordform").value);
	var if_dict = !!get("if_dict").checked;
	var if_infer_stem_mf = !!get("if_infer_mf").checked;
	var if_bare_stem = !!get("if_bare_stem").checked;
	if(if_dict){
		if_infer_stem_mf = 0;
		if_bare_stem = 1;
	}
	var list_wordform = deconjugate (wordform, suffix_lists , if_infer_stem_mf, if_dict, if_bare_stem);
	console.log(if_infer_stem_mf, if_dict, if_bare_stem);
	console.log(list_wordform);
	
 	var innerHTML = '';
	if(if_dict){
		get("if_infer_mf").disabled= true;
		get("if_bare_stem").disabled= true;
		for (i = 0; i < list_wordform.length; i++) {
			lookup_by_graph(list_wordform[i]); // innerHTML must be updated internally becase of asynchronism
		}
	}
	else {
		get("if_infer_mf").disabled= false;
		get("if_bare_stem").disabled= false;
	/*	for (i=0; i<list_wordform.length; i++) {
			innerHTML = innerHTML + '<option>' + list_wordform[i] +'</option>';
		} */
		if (list_wordform.length){
			innerHTML = '<span>' + list_wordform[0] + '</span>';
			for (i=1; i<list_wordform.length; i++) {
				innerHTML = innerHTML + '<br><span>' + list_wordform[i] + '</span>';
			}	
		}
	}
	// console.log(innerHTML);
	get("lemmas").innerHTML = innerHTML;
}
function keybind(event, object)
{
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==27){ // press Esc
		object.value = "";
	} // clear input
	else if(e && e.keyCode==13){ // press Enter
		if(object.id == "input_cell_pinyin"){
			get("input_cell").value = pinyin2graph(object.value); // commit cell
		}
		else if(object.id == "input_lemma_pinyin"){
			get("input_lemma").value = pinyin2graph(object.value); // commit lemma
		}
		else if(object.id == "input_wordform_pinyin"){
			get("input_wordform").value = pinyin2graph(object.value); // commit wordform
		} // deconj
		
		if (object.id == "input_wordform_pinyin" || object.id == "input_wordform") {refresh_LB_deconj_lemma();} // deconj
		else {refresh_TEXT_conj_wordform();}
	} // conj
	else {
		if(object.id == "input_cell_pinyin"){
			get("input_cell").value = pinyin2graph(object.value); // commit cell
		}
		else if(object.id == "input_lemma_pinyin"){
			get("input_lemma").value = pinyin2graph(object.value); // commit lemma
		}
		else if(object.id == "input_wordform_pinyin"){
			get("input_wordform").value = pinyin2graph(object.value); // commit wordform
		} // deconj		
	}
};
function refresh_TEXT_conj_wordform()
{
	var cell = pinyin2graph(get("input_cell").value);
	var lemma = pinyin2graph(get("input_lemma").value);
	var if_chn = get("cb_chn").checked;
	get("wordforms").innerHTML = conjugate_parad(lemma, cell, parad, if_chn);
	// console.log(lemma, cell, parad, if_chn);
}
function conjugate_parad(lemma, cell, parad, if_chn)
{
	var innerHTML = '';
	
		var __left0__ = conjugate(lemma, cell, if_chn);
		// console.log('lemma: ', lemma, cell, if_chn)
		// console.log('__left0__: ', __left0__)
		var wordform = __left0__[0];
		var highlight = __left0__[1];
		if(highlight)
		{
			innerHTML = '<span style="color:red;">' + wordform +'</span>';
		}
		else
		{
			innerHTML = wordform;
		}
		// console.log('innerHTML: ', innerHTML)
	for (var i=0; i < parad.length; i++)
	{
		var __left0__ = conjugate(lemma, parad[i], if_chn);
		var wordform = __left0__[0];
		var highlight = __left0__[1];
		if(highlight)
		{
			innerHTML += '<br><span style="color:red;">' + wordform +'</span>';
		}
		else
		{
			innerHTML += '<br>' + wordform;
		}		
		// console.log('innerHTML: ', innerHTML)
	}
	return innerHTML;
}
