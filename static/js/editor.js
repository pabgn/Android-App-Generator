var editor = {
	dragging:false,
	layoutSelected:'LinearLayout0',
	count:0,
	empty:true,
	insideLayout: false,
	insideElement: 0,
	hiddenOptions:new Array('HTML', 'inside', 'name'),
	elements:{"LinearLayout0":Objects['LinearLayout']},
	initDraggable: function(){
		editor.setId(editor.elements["LinearLayout0"]);
		editor.renderAll();
		$('.object').draggable({  
			opacity: 0.7, 
			helper: 'clone', 
			revert:true,  
		});	
		$('.object').bind('drag', function(ev, ui){
			editor.hoverDetectors();
			editor.dragMonitor($(ui.helper), $(this), false);
			editor.showLayouts();
		});
		$('.object').bind('dragstop', function(ev, ui){
			editor.dragMonitor($(ui.helper), $(this), true);
		});
	},
	dragMonitor: function(object, original, stop){
		editor.dragging = true;
		if (stop) {
			editor.count++;
			//$('#'+editor.layoutSelected).append(editor.setCount(Objects[$(original).attr('id')]['HTML']));
			//Save new element
			id = "'"+$(original).attr('id')+editor.count+"'";
			if (editor.insideLayout) {
				$('#TreeView-' + editor.layoutSelected + ' ul').append(editor.setCount('<li onClick="editor.showOptions('+id+');" id="TreeView-'+ Objects[$(original).attr('id')]['name'] +'%d">' + Objects[$(original).attr('id')]['name'] + '<ul></ul></li>'));
			} else if (editor.empty) {
				$('#elements_in_use ul').html(editor.setCount('<li onClick="editor.showOptions('+id+');" id="TreeView-'+ Objects[$(original).attr('id')]['name'] +'%d">' + Objects[$(original).attr('id')]['name'] + '<ul></ul></li>'));
				editor.empty = false;
			} else {
				$('#elements_in_use ul.root').append(editor.setCount('<li onClick="editor.showOptions('+id+');" id="TreeView-'+ Objects[$(original).attr('id')]['name'] +'%d">' + Objects[$(original).attr('id')]['name'] + '<ul></ul></li>'));
			}
			editor.insideLayout = false;
			//Save element in object.
			editor.addElement(editor.layoutSelected, $(original).attr('id'));
			editor.renderAll();
			$('#'+editor.layoutSelected).css('background-color', '');
			editor.dragging = false;
			editor.hideOptions();
		}
	},
	addElement:function(layout, element){
			editor.elements[layout]["inside"][element+editor.count]=Objects[element];
			editor.setId(editor.elements[layout]["inside"][element+editor.count]);	
	},
	showLayouts:function(){
			$('.layout').css('border', '2px dotted white');			
			$('.layout').css('height', '40px');			
	},
	hideLayouts:function(){
		$('.layout').css('border', '');			
		$('.layout').css('height', '100%');				
	},
	hoverDetectors: function(){
		//Main Layout (elements)
		$('#elements').hover(function() {
				$('#console').html('Inside Elements');
		 		editor.layoutSelected = 'elements';
				$(this).css('background-color', '#515151');	
		}, function() {
				$('#console').html('');
				$(this).css('background-color', '');			
		});
		//Layouts:
		$('.layout').hover(function(){
				editor.layoutSelected=$(this).attr('id');
				$('#console').html('Inside Layout: ' + editor.layoutSelected);
				$(this).css('background-color', '#515151');
				editor.insideLayout = true;
				
			}, function(){
				$('#console').html('');
				$(this).css('background-color', '');
			}
		);
	},	
	setId:function(element){
		element.id=element.id.replace("%d", editor.count);
	
	},
	setCount: function(str) {
		return str.replace("%d", editor.count);
	},
	setHTMLId:function(str,id){
		return str.replace("%d", id);	
		
	},
	showOptions:function(id){
		id_form = '"'+id+'"';
		$("#elements-tree").hide();
		$("#options-editor").show();
		$("#options_in_object").html("");
		for(var prop in editor.elements[id]){
			if($.inArray(prop, editor.hiddenOptions)==-1){
				value = '"'+editor.elements[id][prop]+'"';
				$("#options_in_object").append(prop+": <input onChange='editor.updateOption("+id_form+","+value+");' type='text' value='"+editor.elements[id][prop]+"'><br>");
			}
		}
		
	},
	updateOption:function(id, value){
		for(var prop in editor.elements[id]){
			if($.inArray(prop, editor.hiddenOptions)==-1){
				editor.elements[id][prop]=value;
			}
		editor.renderAll();
		}
		
		
	},
	hideOptions:function(){
		$("#elements-tree").show();
		$("#options-editor").hide();
		
	},
	renderValue:function(id, value){
		html = $("#"+id).html();
		$("#"+id).html(html.replace("%val", value));
		
	},
	renderAll:function(){
			$("#elements").html("");
			editor.render(editor.elements, "elements");
	
	},
	
	render:function(elements, layout){
	

		for(var element in elements){
			$("#"+layout).append(editor.setHTMLId(elements[element]['HTML'],elements[element]['id']));
			editor.renderValue(elements[element]['id'], elements[element]['value']);
			try{if(Object.keys(editor.elements[element]["inside"]).length>0){
				editor.render(elements[element]['inside'], elements[element]['id']);
			} } catch(error){
				
			}	
			
		}
		
	}
}