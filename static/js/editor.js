var editor = {
	dragging:false,
	layoutSelected:'elements',
	count:0,
	empty:true,
	insideLayout: false,
	insideElement: 0,
	hiddenOptions:new Array('HTML', 'inside', 'name'),
	elements:{},
	initDraggable: function(){
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
			$('#'+editor.layoutSelected).append(editor.setCount(Objects[$(original).attr('id')]['HTML']));
			//Save new element
			id = "'"+$(original).attr('id')+editor.count+"'";
			if (editor.insideLayout) {
				$('#TreeView-' + editor.layoutSelected + ' ul:first').append(editor.setCount('<li onClick="editor.showOptions('+id+');" id="TreeView-'+ Objects[$(original).attr('id')]['name'] +'%d">' + Objects[$(original).attr('id')]['name'] + '<ul></ul></li>'));
			} else if (editor.empty) {
				$('#elements_in_use ul').html(editor.setCount('<li onClick="editor.showOptions('+id+');" id="TreeView-'+ Objects[$(original).attr('id')]['name'] +'%d">' + Objects[$(original).attr('id')]['name'] + '<ul></ul></li>'));
				editor.empty = false;
			} else {
				$('#elements_in_use ul').append(editor.setCount('<li onClick="editor.showOptions('+id+');" id="TreeView-'+ Objects[$(original).attr('id')]['name'] +'%d">' + Objects[$(original).attr('id')]['name'] + '<ul></ul></li>'));
			}
			elements['e'+editor.count]=Objects[$(original).attr('id')];
			if (editor.layoutSelected=="elements") {
				editor.elements[$(original).attr('id')+editor.count]=Objects[$(original).attr('id')];
				editor.setId(editor.elements[$(original).attr('id')+editor.count]);
			} else { 
				editor.elements[editor.layoutSelected]["inside"][$(original).attr('id')+editor.count]=Objects[$(original).attr('id')];	
				editor.setId(editor.elements[$(original).attr('id')+editor.count]);			
			}
			//
			$('#'+editor.layoutSelected).css('background-color', '');
			editor.dragging = false;
			editor.hideOptions();
			
		}
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
	
	renderElements:function(){
		for(var element in editor.elements){
				$("#elements").append(editor.setCount(element['HTML']));
				for(element2 in element['inside']){
					$("#"+element[id]).append(element2['HTML']);
					
				
			}
		
		}
	}
}