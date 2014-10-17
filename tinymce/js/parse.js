// JavaScript Document
// Parse the information from the input string coming from Moodle's HTMLArea 
// right into the text fields

var splitstring;
var preflag;
var longstring;
// var longstring = "{1:MULTICHOICE:%0%global delivery system#~%100%local management system#~%0%communal drainage system#~%0%state funding system#}";

function loadContent() {
  // Local testing purpose
  // Does not affect online experience  
  
//  alert('loadContent'+preflag)


  if (typeof(preflag) != "undefined") {
//     alert('preflag set');
//     alert('longstring'+longstring);
    splitstring = window.longstring;
  } 
  
  // check if user highlighted code or plain text            
  if (isCode(splitstring)) {
//    alert('Is Code');
    // user highlighted quiz code
    for (var i = 1; i<=countAnswers(); i++) {
      // add as many lines as there are answers
      addRow('main_table'); 
    }
    





    // Fill all input boxes with code from Moodle's HTMLArea accordingly
    fillBoxes(splitstring);
    encode();
  } else if (isCode(splitstring) == false) {
    // user highlighted text
    // add three rows, standard input

    addRow('main_table');
    addRow('main_table');
    addRow('main_table');
    
    // fill only the first box, because the user selected text
    fillFirstBoxOnly(splitstring);
  }
  
  // Toogle throttle column accordingly
  toggleThrottle();
}

// Fill boxes with quiz code coming from Moodle's HTMLArea
function fillBoxes(string) {
  // TODO: should be reforget according to the getELEMENTNAMEElement() style
  var f = document.forms[0];
  var selection;
  
  // inserted for local testing purposes
  if (typeof(preflag) == 'undefined') {
    selection = tinyMCEPopup.editor.selection.getContent({format : 'text'});
//    alert('fill boxes 1');
  } else {
//    alert('fill boxes 1');
    selection = window.longstring;
  }
   
  // insert points
  f.weighting.value = getPoints(selection);
  
  // set test variant
  setTestVariant(getQuizTypeFromString(selection));  
   
  // fill boxes
  var i = 1;
  var defined = true;
  while (defined == true) {
    // loop through all table rows and fill inputs
    if (getAnswerElement(i)) { // Check if element exists
      getAnswerElement(i).value = getAnswer(selection, i);
      getPercentElement(i).value = getPercentage(selection, i);
      
      // TODO
      if (getPercentage(selection, i) == '100') {
        checkPercentOnLeave(i)
      } else { 
        checkPercentOnLeave(i);
      }
      getFeedbackElement(i).value = getComment(selection, i);
      getThrottleElement(i).value = getThrottle(selection, i);
      i = i+1;
    } else {
      defined = false;
    }
  }



 
}




// Fill boxes with quiz code coming from Moodle's HTMLArea
function fillBoxesEO(preset) {
   
 
    var preflag='true';

  if (preset == 'acidbase') {
	var	longstring = '{1:MULTICHOICE:%100%H⁺/H₂O#~%0%⁻OH/NaOH#}';
}


  if (preset == 'alkyne') {
	var	longstring = '{1:MULTICHOICE:%100%KMnO₄#This reagent is for oxidative cleavage~%0%2Br₂#This reagent is for dibromination~%0%Br₂#This reagent is for dibromination~%0%2Cl₂#This reagent is for dichlorination~%0%Cl₂#This reagent is for dichlorination~%0%HBr#This reagent is for hydrobromination~%0%2HBr#This reagent is for hydrobromination~%0%2HCl#This reagent is for hydrochlorination~%0%HCl#This reagent is for hydrochlorination~%0%H₂O H₂SO₄#This reagent is for hydration~%0%Pd/C H₂#This reagent is for hydrogenation to alkanes~%0%H₂ Pd/CaCO₃#This reagent is for hydrogenation to alkenes - syn stereochemistry~%0%O₃#This reagent is for oxidative cleavage~%0%1) BH₃ THF 2) H₂O₂ NaOH#This reagent is for hydration~%0%NaNH₂#This reagent is for deprotonation of terminal alkynes}';
}

  if (preset == 'oxidation') {
	var	longstring = '{1:MULTICHOICE:%100%Na₂Cr₂O₇#~%0%PCC#~%0%PDC#~%0%CrO₃#~%0%KMnO₄#}';
}


  if (preset == 'reduction') {
	var	longstring = '{1:MULTICHOICE:%100%Pd/C H₂#~%0%Pd/CaCO₃ H₂#~%0%Na/NH₃#~%0%NaBH₄#~%0%LiAlH₄#~%0%DIBAL-H#~%0%1) BH₃ 2) H₃O+#}';
}

  if (preset == 'alcohol') {
	var	longstring = '{1:MULTICHOICE:%100%HCl#~%0%HBr#~%0%PCC#~%0%PDC#~%0%Na₂Cr₂O₇#~%0%SOCl₂ Pyridne#~%0%PBr₃#~%0%TosCl#~%0%NaH#~%0%NaNH₂#}';
}


  if (preset == 'nucleophile') {
	var	longstring = '{1:MULTICHOICE:%100%Cl-#~%0%Br-#~%0%I-#~%0%N₃-#~%0%-CN#~%0%CH₃NH2#~%0%CH₃CH₂NH₂#~%0%CH₃CH₂CH₂NH₂#~%0%CH₃CO₂-#~%0%-OH#~%0%-OCH₃#~%0%-SH#~%0%S(CH₃)₂#}';
}



  if (preset == 'electrophiles') {
	var	longstring = '{1:MULTICHOICE:%100%CH₃OTs#~%0%CH₃I#~%0%CH₃Br#~%0%CH₃Cl#~%0%CH₃F#~%0%ROTs#~%0%RI#~%0%RBr#~%0%RCl#~%0%RF#~%0%CH₃CH₂Br#~%0%CH₃CH₂CH₂Br#~%0%CH₃(CH₂)₃Br#~%0%CH₃(CH₂)₄Br#~%0%CH₃(CH₂)₅Br#~%0%CH₃(CH₂)₆Br#~%0%CH₃(CH₂)₇Br#}';
}


  if (preset == 'organometallic') {
	var	longstring = '{1:MULTICHOICE:%100%Pd(0) PR₃ K₂CO₃#Suzuki and Heck Conditions (Cross-Coupling~%0%Ru(PCy₃)Cl₂CH₂Ph#Grubbs Olefin metathesis catalyst ~%0%RLi#Organolithium (strong base and Nu-)~%0%RMgX#Grignard Reagent (strong base and Nu-)~%0%Ru(PPh₃)₃Cl#Wilkinsons Catalyst (selective alkene reduction)~%0%Cp₂ZrCl₂#Ziegler-Nata Catalyst (polymerization of terminal olefins)}';
}



  if (preset == 'alkene') {
    	var	longstring = '{1:MULTICHOICE:%100%KMnO₄#This reagent is for oxidative cleavage of alkenes.~%0%Br₂#This reagent is for bromination - anti stereochemistry.~%0%Cl₂#This reagent is for chlorination - anti stereochemistry.~%0%HBr#This reagent is for hydrobromination - no stereochemistry/Markovnikov regiochemistry.~%0%HCl#This reagent is for hydrochlorination - no stereochemistry/Markovnikov addition.~%0%NBS H₂O#This reagent forms bromohydrins.~%0%H₂SO₄#This reagent produces hydrosulfates.~%0%H₂O H₂SO₄#This reagent is for hydration - Markovnikov regiochemistry.~%0%HBr ROOH#This reagent is for radical hydrobromination - no stereochemistry/non-Markovnikov regiochemistry.~%0%Pd/C H₂#This reagent is for hydrogenation - syn stereochemistry.~%0%Pd/C D₂#This reagent is for hydrogenation - syn stereochemistry.~%0%NCS H₂O#This reagent forms chlorohydrins.~%0%1) BH₃ THF 2) H₂O₂ NaOH#This reagent is for hydration - syn stereochemistry/non-Markovnikov regiochemistry.~%0%1) BD₃ THF 2) H₂O₂ NaOH#This reagent is for hydration - syn stereochemistry/non-Markovnikov regiochemistry.~%0%O₃#This reagent is for oxidative cleavage of alkenes.~%0%MCPBA#This reagent (meta-chloroperoxybenzioc acid) is used for epoxidation.~%0%ICH₂ZnI#This reagent (Simmons-Smith) is used for cyclopropanation.}';

	}
   deleteallRows('main_table');
   window.longstring = longstring;


    ////delete all rows
	




    loadContent();




}




function fillFirstBoxOnly(string) {
  // fires when user marked one or more words which should not contain '{' and '}' at first, second, last, or first before last position
  
  var selection;
  
  if (typeof(preflag) == "undefined") {
    selection = tinyMCEPopup.editor.selection.getContent({format : 'text'});
  } else {
    // for local testing purpose
    selection = window.longstring;
  } 
  
  getAnswerElement(1).value = trim(selection);
	getGradeElement().value = "1";
	getCorrectElement(1).checked = true;
	correctnessClick(1);
}

function checkPercentInput(objectID) {
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü'];
  var element = getAnswerElement(objectID);
  
  /*
  This is highly experimental and just a mind experiment. Such a check might be implemented in the future
  
  var noStrings = "";
  for (var c; c < length(element.value); c++) {
    if (lowerCase(element.value[c]) in alphabet) {
      //
    } else {
      noStrings = noStrings + element.value[c];
    }
  }
  
  element.value = noStrings;
  */
  
  setPercentTo100(objectID);
}

function setPercentTo100 (objectID) {
  var element = getPercentElement(objectID); 
  
  if (element.value > 100) {
    element.value = 100;
    checkPercentOnLeave(objectID);
  }
}



function deleteallRows(tableID) {
            try {
            var table = document.getElementById(tableID);
            var rowCount = table.rows.length;
            
            for(var i=1; i<rowCount; i++) {
//		alert(i);
                var row = table.rows[i];
                var chkbox = row.cells[6].childNodes[0];
//		alert(chkbox.checked);
                
                    table.deleteRow(i);
                    rowCount--;
                    i--;
                
 
 
            }
            }catch(e) {
                alert(e);
            }
        }





function deleteRow(tableID) {
            try {
            var table = document.getElementById(tableID);
            var rowCount = table.rows.length;
            
            for(var i=1; i<rowCount; i++) {
//		alert(i);
                var row = table.rows[i];
                var chkbox = row.cells[6].childNodes[0];
//		alert(chkbox.checked);
		console.log(i);
                if(null != chkbox && true == chkbox.checked) {
                    table.deleteRow(i);
                    rowCount--;
               
			///better renumber remaining
			for(var j=i; j<rowCount; j++){
			console.log('j='+j)
			console.log('i='+i)
			var row = table.rows[j];
	                var cell1 = row.cells[1].childNodes[0];
			var cell0 = row.cells[0].childNodes[0];
			var cell2 = row.cells[2].childNodes[0];
			var cell3 = row.cells[3].childNodes[0];
			var cell4 = row.cells[4].childNodes[0];
			var cell5 = row.cells[5].childNodes[0];
			cell1.id = j+'_option';
			cell1.name = j+'_option';
			cell0.innerHTML = j;
			cell0.for = j+'_option';
			cell2.name = j+'_throttle';
			cell3.name = j+'_correct';
			var str = j.toString();

			cell3.setAttribute('onclick', 'correctnessClick('+ str +')')

			cell3.onClick = 'correctnessClick('+ str +')';
			cell4.name = j+'_percent';
			cell4.setAttribute('onchange','correctnessClick('+ str +'); setPercentTo100('+ str +') style="background-color: white; color: black;"')
			cell4.onchange = 'correctnessClick('+ str +'); setPercentTo100('+ str +') style="background-color: white; color: black;"';
			cell5.name = j+'_feedback';
			console.log(cell1)
			}



		    i--;
                }
 
 
            }
            }catch(e) {
                alert(e);
            }
        }






function addRow(id) {
    counter = countInputRows() + 1;
    
    var tbody = document.getElementById(id).getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR");

    var td1 = document.createElement("TD");
    var td2 = document.createElement("TD");
    var td3 = document.createElement("TD");
    var td4 = document.createElement("TD");
    var td5 = document.createElement("TD");
    var td6 = document.createElement("TD");
    var td7 = document.createElement("TD");
    
    //chk col: 
    td7.className = "table_value";
    var input_chk = document.createElement("INPUT");
//    input_answer = document.createElement("INPUT");
    td7.appendChild(input_chk);
    input_chk.type = "checkbox";
    input_chk.id = "chkbox";
    input_chk.name = "chkbox";
    td7.appendChild(input_chk);

    //first col: Counter
    td1.className = "table_value";
    var label1 = document.createElement("LABEL"); 
    label1.setAttribute("for", counter+"_option");
    td1.appendChild(label1);
    label1.appendChild(document.createTextNode(counter));   
  
    
    //second col: Answer  
    td2.className = "table_value";  
    var input_answer = document.createElement("INPUT");
    td2.appendChild(input_answer);
    input_answer.type = "text";
    input_answer.id = counter+"_option";
    input_answer.name = counter+"_option";
    input_answer.size = 30;
    input_answer.setAttribute("onkeypress", "if (event.keyCode==13) { encode() }" );
                                            
    
    //third col: Throttle Value
    td3.className = "table_value_throttle";
    var input_throttle = document.createElement("INPUT");
    input_throttle.type = "text";
    input_throttle.name = counter+"_throttle";
    if (getQuizTypeElement().value == "NUMERICAL") {
      td3.style.display = "inherit";
    } else {
      td3.style.display = "none";
    }
    
    td3.appendChild(input_throttle);
    
    //fourth col: Checkbox
    td4.className = "table_value";
    var input_checkbox = document.createElement("INPUT");
    input_checkbox.type = "checkbox";
    input_checkbox.name = counter+"_correct";
    input_checkbox.setAttribute("onclick", "correctnessClick("+counter+")");
    input_checkbox.checked = false;
    td4.appendChild(input_checkbox);
       
    //fifth col: Percentage Value
    td5.className = "table_value";
    var input_percent = document.createElement("INPUT");
    input_percent.type = "text";
    input_percent.name = counter+"_percent";
    input_percent.value = "0";
    input_percent.size = 4;
    input_percent.maxLength = 4;
    input_percent.setAttribute("onChange", "correctnessClick("+counter+"); setPercentTo100("+counter+")");
    td5.appendChild(input_percent);
     
    
    //sixth col: Feedback
    td6.className = "table_value";
    var input_feedback = document.createElement("INPUT");
    input_feedback.type = "text";
    input_feedback.name = counter+"_feedback";
    input_feedback.value = "";
    input_feedback.size = 30;
    td6.appendChild(input_feedback);
    
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);
    tbody.appendChild(row);
}

// this function will set the correctess status upon clicking a checkbox
function correctnessClick (objectID) {
  var correct_element = getCorrectElement(objectID); 
  var percent_element = getPercentElement(objectID); 
  
  if (correct_element.checked == false) {
    setCorrectnessState(objectID, "on");
  } else if (correct_element.checked == true) {
    setCorrectnessState(objectID, "off");
  }
} 


// this function sets the color of the percentage input field to grey or white, according to the correctness checkbox
function setCorrectnessState(objectID, state) {
  var correct_element = getCorrectElement(objectID); 
  var percent_element = getPercentElement(objectID); 
  
	if (state == "off") {
		// gray out
		percent_element.style.backgroundColor = "EEEEEE";
		percent_element.style.color = "888888";	
		percent_element.value = "100";
		percent_element.readOnly = true;
		correct_element.checked = true;
		
		// TODO: canFocus = false
	} else if (state == "on") {
		// restore color
		percent_element.style.backgroundColor = "white";
		percent_element.style.color = "black";
		if (percent_element.value == "100") { 
      // if the value is 100, there should be a 0 so it does not say 100 and is at the same time not checked in the check box
      percent_element.value = "0";
		}
		percent_element.readOnly = false;
		correct_element.checked = false;
	}
}

function setTestVariant(test) {
  //var f = document.forms[0];
  
  var index = 0;
  
  if (test == 'SHORTANSWER') {
    index = 0;
  } else if (test == 'SHORTANSWER_C') {
    index = 1;
  } else if (test == 'MULTICHOICE') {
    index = 2;
  } else if (test == 'MULTICHOICE_V') {
    index = 3;
  } else if (test == 'MULTICHOICE_H') {
    index = 4;
  } else if (test == 'NUMERICAL') {
    index = 5;
  }  
  
  //old version
  //f.quiz_type.selectedIndex = index; 
  getQuizTypeElement().selectedIndex = index;
}

// this function retrieves points for a given test
function getPoints(string) {
  var temp = string;
  
  temp = deleteAfterString(temp, ':');
  temp = deleteTillChar(temp, '{');
  
  // if the user has highlighted a non-break space at the beginning, it has to be omitted
  if (typeof(temp) != "undefined") {
    if (temp.charAt(0) == '{') {
      return temp.charAt(1);
    } else {
      return temp.charAt(0);
    }
  }
}

// this function retrieves the test variant for a given test
function getQuizTypeFromString(string) {
  // jump straight to the test variant, after the first colon
  var temp = string;
  
  // delete everything before (and including) the first ':'
  temp = deleteTillChar(temp, ':');
  // delete everything after (and including) the second ':'
  temp = deleteAfterString(temp, ':');
  
  return temp;
}

// ----------------------

if (typeof(tinyMCEPopup) != "undefined") {
  tinyMCEPopup.requireLangPack();
}

var eoclozeeditorDialog = {
	init : function() {
		//var f = document.forms[0];

		// Get the selected content as text
    splitstring = tinyMCEPopup.editor.selection.getContent({format : 'text'});
    
    loadContent();
    
    // stopped working, or never did, so commented it out on 2011-10-14, 1pm
		//f.somearg.value = tinyMCEPopup.getWindowArg('some_custom_arg');
	},

	insert : function() {
		// Insert the contents from the input into the document
		// deprecated
		
		//tinyMCEPopup.editor.execCommand('mceInsertContent', false, getEncodeElement().value+" ");
               // alert(encode()+);
		tinyMCEPopup.editor.execCommand('mceInsertContent', false, encode()+" ");

		tinyMCEPopup.close();
	}
};

if (typeof(tinyMCEPopup) != "undefined") {
  tinyMCEPopup.onInit.add(eoclozeeditorDialog.init, eoclozeeditorDialog);
}
