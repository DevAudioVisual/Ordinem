
$.runScript = {

importBrutes: function(){

		app.enableQE();
		var project = app.project;
		var sequence = project.activeSequence;
		var qeSequence = qe.project.getActiveSequence();
		var escola = parseInt(escolaSel);


		importFolders();
		changeSize();
		unlinkAudio();
		deleteAudio();
		insertAudio();
		correctSync();
		delAudio();
		delVideo();
		//------------------Acessando a pasta Brutos e importando pasta ------------------------------
		function importFolders(){
			
			var project = app.project;
			var projectPath = project.path.toString();
			var projectName = project.name.toString();
			var projectFolder = projectPath.replace(projectName,"");
			var rootFolder = projectFolder.replace("\\04_Premiere\\","");
			var bruteFolder = rootFolder + "\\01_Bruto\\";
			var audioFolder = rootFolder + "\\02_Audio\\";
			 
			project.importFiles(audioFolder,1,project.rootItem,0);
			project.importFiles(bruteFolder,1,project.rootItem,0);
			var sequenceName = rootFolder.split("\\")[3];
			var qtdeVideos = app.project.rootItem.children[1].children.numItems;
			var nomeVideos = [];

			for (var i=0; i<qtdeVideos; i++){
				var endereco = app.project.rootItem.children[1].children[i];
				nomeVideos.push(endereco)
			}
              
			app.project.createNewSequenceFromClips(sequenceName+"_Principal",nomeVideos, app.project.rootItem);

			}

			function changeSize(){

				var sequenceSettings = app.project.activeSequence.getSettings();
				sequenceSettings.videoFrameHeight = 1080;
				sequenceSettings.videoFrameWidth = 1920;
				app.project.activeSequence.setSettings(sequenceSettings);
			}

			function unlinkAudio(){
    
				var nomeDosItens = app.project.activeSequence.audioTracks[0].clips.numItems;
				
				for (var i=0; i<nomeDosItens;i++){

					app.project.activeSequence.audioTracks[0].clips[i].setSelected(1, 1)

				 }
				 app.project.activeSequence.unlinkSelection();
				}

				function deleteAudio(){
					var nomeDosItens = app.project.activeSequence.videoTracks[0].clips.numItems;
				
				for (var i=0; i<nomeDosItens;i++){
				
				app.project.activeSequence.audioTracks[0].clips[0].remove(1,1);
				 
				 }
				}
				function insertAudio(){
    
					var itemAudioCount = app.project.rootItem.children[0].children.numItems.toString();
					for (var i=itemAudioCount-1; i>=0; i--){
					var numAudioBin = i.toString();
					var audioFile = app.project.rootItem.children[0].children[numAudioBin];
					project.activeSequence.audioTracks[0].insertClip(audioFile, 0);
					}
					
					}

				function correctSync(){
					var qtdeItens = app.project.activeSequence.videoTracks[0].clips.numItems;
					
					for (var i=0; i<qtdeItens;i++){
					
					var videoTime = app.project.activeSequence.videoTracks[0].clips[i].start;
					var audioTime = app.project.activeSequence.audioTracks[0].clips[i].start;
					var resultado = new Time();
					resultado.seconds = audioTime.seconds-videoTime.seconds;
					
					app.project.activeSequence.videoTracks[0].clips[i].move(resultado)
					
					}
					}
			function delAudio(){
				app.enableQE();
				var vanillaSequence = app.project.activeSequence;
				var qeSequence = qe.project.getActiveSequence();
				qeSequence.removeAudioTrack(2);
			}
			function delVideo(){
				app.enableQE();
				var vanillaSequence = app.project.activeSequence;
				var qeSequence = qe.project.getActiveSequence();
				var qtasFaixas = vanillaSequence.videoTracks.numTracks;
				qeSequence.removeVideoTrack(2);
		
			}

			

	},

	assetFC: function(){
		
		app.enableQE();
		var qeSequence = qe.project.getActiveSequence();
		var qtasFaixas = app.project.activeSequence.videoTracks.numTracks;
		var sequence = app.project.activeSequence;
		

		addFacecamAsset();
		adjustAssetSize();
		cutAssets();


		function addFacecamAsset(){
			if (molduraFC == 0){
				qeSequence.addTracks(1,qtasFaixas,0,0);
				var newMOGRT = sequence.importMGTFromLibrary("ALURA_ESCOLAS", "Facecam_Horizontal",0, qtasFaixas, 0);
				newMOGRT.setSelected(1,1);
				var components = newMOGRT.getMGTComponent();
				var escola = parseInt(escolaSel);
				components.properties[0].setValue(escola);
			}
			else {
				qeSequence.addTracks(1,qtasFaixas,0,0);
				var newMOGRT = sequence.importMGTFromLibrary("ALURA_ESCOLAS", "Facecam_1x1",0, qtasFaixas, 0);
				newMOGRT.setSelected(1,1);
				var components = newMOGRT.getMGTComponent();
				var escola = parseInt(escolaSel);
				components.properties[0].setValue(escola);
			}
			
		}
		function adjustAssetSize(){
				var lastVideoNumber = app.project.activeSequence.videoTracks[0].clips.numItems;
				var minusOne = lastVideoNumber -1;
				var lastVideoEnd = app.project.activeSequence.videoTracks[0].clips[minusOne].end.ticks
				app.project.activeSequence.videoTracks[qtasFaixas].clips[0].end = lastVideoEnd ;
		}
		function cutAssets(){
			app.enableQE;
		
		var time = new Time();
		var audioCounter = app.project.activeSequence.videoTracks[0].clips.numItems;
		
		for (i=0; i<audioCounter; i++){
			
				time.seconds = app.project.activeSequence.audioTracks[0].clips[i].end.seconds;
			   var timecode = time.getFormatted(app.project.activeSequence.getSettings().videoFrameRate, app.project.activeSequence.getSettings().videoDisplayFormat);
			   $.writeln(timecode)
						
			   qe.project.getActiveSequence().getVideoTrackAt(qtasFaixas).razor(timecode)

			
				}
			
		}
	},

	addAudio: function(){
		app.enableQE();
		var vanillaSequence = app.project.activeSequence;
		var qeSequence = qe.project.getActiveSequence();
		var qtasFaixas = vanillaSequence.audioTracks.numTracks;
		qeSequence.addTracks(0,0,1,1,qtasFaixas,0,0,0);

	},
	
	subAudio: function(){
		app.enableQE();
		var vanillaSequence = app.project.activeSequence;
		var qeSequence = qe.project.getActiveSequence();
		var qtasFaixas = vanillaSequence.audioTracks.numTracks;
		qeSequence.removeAudioTrack(qtasFaixas-1);

		
	},

	addVideo: function(){
		app.enableQE();
		var vanillaSequence = app.project.activeSequence;
		var qeSequence = qe.project.getActiveSequence();
		var qtasFaixas = vanillaSequence.videoTracks.numTracks;
		qeSequence.addTracks(1,qtasFaixas,0,0);
	},
	
	subVideo: function(){
		app.enableQE();
		var vanillaSequence = app.project.activeSequence;
		var qeSequence = qe.project.getActiveSequence();
		var qtasFaixas = vanillaSequence.videoTracks.numTracks;
		qeSequence.removeVideoTrack(qtasFaixas-1);

	},

	autoCrop: function(){
		var starts = [];
		var ends = [];
		var selected =[];

	checkSelected();
	//cutAssetsStarts();
	cutAssetsEnds();


        
for (var i =0; i<ends.length; i++){
qe.project.getActiveSequence().getVideoTrackAt(parseInt(selected)).razor(ends[i])    
}

for (var i =0; i<starts.length; i++){
qe.project.getActiveSequence().getVideoTrackAt(parseInt(selected)).razor(starts[i])    
}  
        
        
 function checkSelected(){
     var numTracks = app.project.activeSequence.videoTracks.numTracks;
     for (var i=0; i<numTracks; i++) {
          var numClips = app.project.activeSequence.videoTracks[i].clips.numItems;
          for (var o=0; o<numClips; o++){
              if (app.project.activeSequence.videoTracks[i].clips[o].isSelected()){
               selected.push(i);
                  }
              }
      }
     
     }
        
        function cutAssetsStarts(){
			app.enableQE;
		
		var time = new Time();
		var audioCounter = app.project.activeSequence.videoTracks[parseInt(faixaVideo)].clips.numItems;
		
		for (i=0; i<audioCounter; i++){
			
				time.seconds = app.project.activeSequence.videoTracks[parseInt(faixaVideo)].clips[i].start.seconds;
			   var timecode = time.getFormatted(app.project.activeSequence.getSettings().videoFrameRate, app.project.activeSequence.getSettings().videoDisplayFormat);
				starts.push(timecode)
			
				}
			
		}
    
            function cutAssetsEnds(){
			app.enableQE;
		
		var time = new Time();
		var audioCounter = app.project.activeSequence.videoTracks[parseInt(faixaVideo)].clips.numItems;
		
		for (i=0; i<audioCounter; i++){
			
				time.seconds = app.project.activeSequence.videoTracks[parseInt(faixaVideo)].clips[i].end.seconds;
			   var timecode = time.getFormatted(app.project.activeSequence.getSettings().videoFrameRate, app.project.activeSequence.getSettings().videoDisplayFormat);
				ends.push(timecode)
			
				}
			
		}
	},

	arrumaTela: function(){
		var sequence = app.project.activeSequence;
		var selected =[];
		checkSelected();
		

		if (ladoInst ==0){ // INSTRUTOR na ESQUERDA
			var qtosClipes = sequence.videoTracks[selected].clips.numItems;
			for (var i=0; i<qtosClipes; i++){	
				app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[5].setValue([0.75,0.5],1);
				app.project.activeSequence.videoTracks[selected].clips[i].setSelected(1,1);
				crop();
				app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[0].setValue(50,1);
				app.project.activeSequence.videoTracks[selected].clips[i].setSelected(0,1);
			}
		}

		else { // INSTRUTOR na DIREITA
			var qtosClipes = sequence.videoTracks[selected].clips.numItems;
			for (var i=0; i<qtosClipes; i++){
				app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[5].setValue([0.25,0.5],1);
				app.project.activeSequence.videoTracks[selected].clips[i].setSelected(1,1);
				crop();
				app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[2].setValue(50,1);
				app.project.activeSequence.videoTracks[selected].clips[i].setSelected(0,1);

			}
		}

		function checkSelected(){
			var numTracks = app.project.activeSequence.videoTracks.numTracks;
			for (var i=0; i<numTracks; i++) {
				var numClips = app.project.activeSequence.videoTracks[i].clips.numItems;
				for (var o=0; o<numClips; o++){
					if (app.project.activeSequence.videoTracks[i].clips[o].isSelected()){
					selected.push(i);
						}
					}
			}
			
			}

		function crop(){
			app.enableQE();
				var effect = "Crop";

				if(app.project.activeSequence == null) {
					alert("Please select a sequence first");
					return false;
					}

					var qeSequence = qe.project.getActiveSequence(0);
					var sequence = app.project.activeSequence;
					var videoTracks = sequence.videoTracks;
					
					var thisQETrack, thisVanillaClip;
					for(var i = 0; i < videoTracks.numTracks; i++) {
						thisQETrack = qeSequence.getVideoTrackAt(i);
						for(var e = 0; e < thisQETrack.numItems; e++) {
							if(thisQETrack.getItemAt(e).type.toString() != "Empty") {
								thisVanillaClip = getVanillaClip(thisQETrack.getItemAt(e), i);
								if(thisVanillaClip != null) {
								if(thisVanillaClip.isSelected() == true) {
									thisQETrack.getItemAt(e).addVideoEffect(qe.project.getVideoEffectByName(effect));
									}
								}
								}
							}
						}
					
			
			

				function getVanillaClip(qeClip, trackIndex) {
						for(var c = 0; c < app.project.activeSequence.videoTracks[trackIndex].clips.numItems; c++) {
							if(app.project.activeSequence.videoTracks[trackIndex].clips[c].name == qeClip.name && ((app.project.activeSequence.videoTracks[trackIndex].clips[c].end.seconds - app.project.activeSequence.videoTracks[trackIndex].clips[c].start.seconds).toFixed(2) == (qeClip.end.secs - qeClip.start.secs).toFixed(2))) {
								return app.project.activeSequence.videoTracks[trackIndex].clips[c];
								}
							}
					}
						
				}
	},

	arrumaFC: function(){
		app.enableQE();
		var qeSequence = qe.project.getActiveSequence();
		var qtasFaixas = app.project.activeSequence.videoTracks.numTracks;
		var sequence = app.project.activeSequence;
		var selected =[];
		checkSelected();
		ajustaJanela();
		addFacecamAsset();
		adjustAssetSize();
		//cutAssets();
		
		

		function ajustaJanela(){
		if (ladoInst ==1){ // INSTRUTOR na DIREITA

		var qtosClipes = sequence.videoTracks[selected].clips.numItems;
		for (var i=0; i<qtosClipes; i++){
		app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[1].setValue(21,1)
		app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[0].setValue([0.89968758821487,0.85860937833786],1);
		app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[5].setValue([0.75,0.5],1);
		app.project.activeSequence.videoTracks[selected].clips[i].setSelected(1,1);
		crop();
		app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[0].setValue(54.6,1);
		app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[2].setValue(3.3,1);
		app.project.activeSequence.videoTracks[selected].clips[i].setSelected(0,1);
		}
		}
   
		else { // INSTRUTOR na ESQUERDA
			var qtosClipes = sequence.videoTracks[selected].clips.numItems;
			for (var i=0; i<qtosClipes; i++){   
			app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[1].setValue(21,1)
			app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[0].setValue([0.89968758821487,0.85860937833786],1);
			app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[5].setValue([0.25,0.5],1);
			app.project.activeSequence.videoTracks[selected].clips[i].setSelected(1,1);
			crop();
			app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[2].setValue(50,1);
			app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[0].setValue(4.7,1);
			app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[2].setValue(52.9,1);
			app.project.activeSequence.videoTracks[selected].clips[i].setSelected(0,1);
			}
		}
	}
		function checkSelected(){
			var numTracks = app.project.activeSequence.videoTracks.numTracks;
			for (var i=0; i<numTracks; i++) {
				var numClips = app.project.activeSequence.videoTracks[i].clips.numItems;
				for (var o=0; o<numClips; o++){
					if (app.project.activeSequence.videoTracks[i].clips[o].isSelected()){
					selected.push(i);
						}
					}
			}
			
			}
		function crop(){
			app.enableQE();
				var effect = "Crop";

				if(app.project.activeSequence == null) {
					alert("Please select a sequence first");
					return false;
					}

					var qeSequence = qe.project.getActiveSequence(0);
					var sequence = app.project.activeSequence;
					var videoTracks = sequence.videoTracks;
					
					var thisQETrack, thisVanillaClip;
					for(var i = 0; i < videoTracks.numTracks; i++) {
						thisQETrack = qeSequence.getVideoTrackAt(i);
						for(var e = 0; e < thisQETrack.numItems; e++) {
							if(thisQETrack.getItemAt(e).type.toString() != "Empty") {
								thisVanillaClip = getVanillaClip(thisQETrack.getItemAt(e), i);
								if(thisVanillaClip != null) {
								if(thisVanillaClip.isSelected() == true) {
									thisQETrack.getItemAt(e).addVideoEffect(qe.project.getVideoEffectByName(effect));
									}
								}
								}
							}
						}
					
			
			

				function getVanillaClip(qeClip, trackIndex) {
						for(var c = 0; c < app.project.activeSequence.videoTracks[trackIndex].clips.numItems; c++) {
							if(app.project.activeSequence.videoTracks[trackIndex].clips[c].name == qeClip.name && ((app.project.activeSequence.videoTracks[trackIndex].clips[c].end.seconds - app.project.activeSequence.videoTracks[trackIndex].clips[c].start.seconds).toFixed(2) == (qeClip.end.secs - qeClip.start.secs).toFixed(2))) {
								return app.project.activeSequence.videoTracks[trackIndex].clips[c];
								}
							}
					}
						
				}
		function addFacecamAsset(){
				if (molduraFC == 0){ // retangular
					qeSequence.addTracks(1,qtasFaixas,0,0);
					var newMOGRT = sequence.importMGTFromLibrary("ALURA_ESCOLAS", "Facecam_Horizontal",0, qtasFaixas, 0);
					newMOGRT.setSelected(1,1);
					var components = newMOGRT.getMGTComponent();
					var escola = parseInt(escolaSel);
					components.properties[0].setValue(escola);
				}
				else { //quadrada
					qeSequence.addTracks(1,qtasFaixas,0,0);
					var newMOGRT = sequence.importMGTFromLibrary("ALURA_ESCOLAS", "Facecam_1x1",0, qtasFaixas, 0);
					newMOGRT.setSelected(1,1);
					var components = newMOGRT.getMGTComponent();
					var escola = parseInt(escolaSel);
					components.properties[0].setValue(escola);
				}
				
			}
		function adjustAssetSize(){
					var lastVideoNumber = app.project.activeSequence.videoTracks[selected].clips.numItems;
					var minusOne = lastVideoNumber -1;					
					var lastVideoEnd = app.project.activeSequence.videoTracks[selected].clips[minusOne].end.ticks
					app.project.activeSequence.videoTracks[qtasFaixas].clips[0].end = lastVideoEnd ;
			}
		function cutAssets(){

			
			var time = new Time();
			var videoCounter = app.project.activeSequence.videoTracks[selected].clips.numItems;
			
			for (i=0; i<videoCounter; i++){
				
				   time.seconds = app.project.activeSequence.audioTracks[selected].clips[i].end.seconds;
				   var timecode = time.getFormatted(app.project.activeSequence.getSettings().videoFrameRate, app.project.activeSequence.getSettings().videoDisplayFormat);
				   qe.project.getActiveSequence().getVideoTrackAt(qtasFaixas).razor(timecode)
	
				
					}
				
			}
	},
	
	arrumaFS: function(){
		var sequence = app.project.activeSequence;
		var selected =[];
		checkSelected()

		if (ladoInst ==1){ // INSTRUTOR na DIREITA
			var qtosClipes = sequence.videoTracks[selected].clips.numItems;
			for (var i=0; i<qtosClipes; i++){	
				app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[5].setValue([0.75,0.5],1);
				app.project.activeSequence.videoTracks[selected].clips[i].setSelected(1,1);
				crop();
				app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[0].setValue(50,1);
				app.project.activeSequence.videoTracks[selected].clips[i].setSelected(0,1);
			}		
			}
		else { // INSTRUTOR na ESQUERDA
			var qtosClipes = sequence.videoTracks[selected].clips.numItems;
			for (var i=0; i<qtosClipes; i++){
			app.project.activeSequence.videoTracks[selected].clips[i].components[1].properties[5].setValue([0.25,0.5],1);
			app.project.activeSequence.videoTracks[selected].clips[i].setSelected(1,1);
			crop();
			app.project.activeSequence.videoTracks[selected].clips[i].components[2].properties[2].setValue(50,1);
			app.project.activeSequence.videoTracks[selected].clips[i].setSelected(0,1);
			}
		}

	function checkSelected(){
		var numTracks = app.project.activeSequence.videoTracks.numTracks;
		for (var i=0; i<numTracks; i++) {
			var numClips = app.project.activeSequence.videoTracks[i].clips.numItems;
			for (var o=0; o<numClips; o++){
				if (app.project.activeSequence.videoTracks[i].clips[o].isSelected()){
				selected.push(i);
					}
				}
		}
		
		}
		
	function crop(){
			app.enableQE();
				var effect = "Crop";

				if(app.project.activeSequence == null) {
					alert("Please select a sequence first");
					return false;
					}

					var qeSequence = qe.project.getActiveSequence(0);
					var sequence = app.project.activeSequence;
					var videoTracks = sequence.videoTracks;
					
					var thisQETrack, thisVanillaClip;
					for(var i = 0; i < videoTracks.numTracks; i++) {
						thisQETrack = qeSequence.getVideoTrackAt(i);
						for(var e = 0; e < thisQETrack.numItems; e++) {
							if(thisQETrack.getItemAt(e).type.toString() != "Empty") {
								thisVanillaClip = getVanillaClip(thisQETrack.getItemAt(e), i);
								if(thisVanillaClip != null) {
								if(thisVanillaClip.isSelected() == true) {
									thisQETrack.getItemAt(e).addVideoEffect(qe.project.getVideoEffectByName(effect));
									}
								}
								}
					}
				}
			
    
	

			function getVanillaClip(qeClip, trackIndex) {
					for(var c = 0; c < app.project.activeSequence.videoTracks[trackIndex].clips.numItems; c++) {
						if(app.project.activeSequence.videoTracks[trackIndex].clips[c].name == qeClip.name && ((app.project.activeSequence.videoTracks[trackIndex].clips[c].end.seconds - app.project.activeSequence.videoTracks[trackIndex].clips[c].start.seconds).toFixed(2) == (qeClip.end.secs - qeClip.start.secs).toFixed(2))) {
							return app.project.activeSequence.videoTracks[trackIndex].clips[c];
							}
						}
				}
					
			}
	},

	dupVideo: function(){
				var selected =[];
		checkSelected();
		var numClips = app.project.activeSequence.videoTracks[parseInt(selected)].clips.numItems

		addVideo();
		addAudio();

		for (var i=0; i<numClips; i++){ 
		var last = app.project.activeSequence.videoTracks.numTracks;
		var local = app.project.activeSequence.videoTracks[parseInt(selected)].clips[i].projectItem;
		var tempo = app.project.activeSequence.videoTracks[parseInt(selected)].clips[i].start
		app.project.activeSequence.insertClip(local, tempo, last-1, 1)
		}
		subAudio();






		function checkSelected(){
			var numTracks = app.project.activeSequence.videoTracks.numTracks;
			for (var i=0; i<numTracks; i++) {
				var numClips = app.project.activeSequence.videoTracks[i].clips.numItems;
				for (var o=0; o<numClips; o++){
					if (app.project.activeSequence.videoTracks[i].clips[o].isSelected()){
					selected.push(i);
						}
					}
			}
			
			}

		function addAudio(){
					app.enableQE();
				var vanillaSequence = app.project.activeSequence;
				var qeSequence = qe.project.getActiveSequence();
				var qtasFaixas = vanillaSequence.audioTracks.numTracks;
				qeSequence.addTracks(0,0,1,1,qtasFaixas,0,0,0);
				}
			
			function subAudio(){
						app.enableQE();
				var vanillaSequence = app.project.activeSequence;
				var qeSequence = qe.project.getActiveSequence();
				var qtasFaixas = vanillaSequence.audioTracks.numTracks;
				qeSequence.removeAudioTrack(qtasFaixas-1);
				}
			
			function addVideo(){
				
					app.enableQE();
				var vanillaSequence = app.project.activeSequence;
				var qeSequence = qe.project.getActiveSequence();
				var qtasFaixas = vanillaSequence.videoTracks.numTracks;
				qeSequence.addTracks(1,qtasFaixas,0,0);
				}
	},

	copyParam: function(){

	},

	pasteParam: function(){

	},

	resetParam: function(){

	},



}
