var pepe;
var editor = {
	
	dragging:false,
	layoutSelected:"elements",
	
	initDraggable: function(){
		
		$( ".object" ).draggable({  
			opacity: 0.7, 
			helper: "clone", 
			revert:true, 
			drag: function(ev, ui){
				editor.dragMonitor($(ui.helper), $(this), false);
				editor.showLayouts();
			},
			stop: function(ev, ui){
				editor.dragMonitor($(ui.helper), $(this), true);
				
			} 

		
		});
		
	},
	
	dragMonitor: function(object, original, stop){
		editor.dragging=true;
		$("#elements").hover(function(){
		 		if(editor.dragging==true){
				$(this).css("background-color", "#515151");
				}
				
			})
		if(stop){
			$("#"+editor.layoutSelected).append(HTML[$(original).attr('id')]);
			$("#"+editor.layoutSelected).css("background-color", "");
			editor.dragging=false;
		}
	},
	
	showLayouts:function(){
			$(".layout").css("border", "2px dotted white");			
			$(".layout").css("height", "40px");			
			$(".layout").hover(function(){
				editor.layoutSelected=$(this).attr("id");
				$(this).css("background-color", "#515151");
			});
		
	},
	hideLayouts:function(){
		$(".layout").css("border", "");			
		$(".layout").css("height", "100%");			
		
	}
	
	
	
}