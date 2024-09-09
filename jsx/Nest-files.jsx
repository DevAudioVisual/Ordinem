// Identifica faixas selecionadas
var numVideoTracks = app.project.activeSequence.videoTracks.numTracks;
var numAudioTracks = app.project.activeSequence.audioTracks.numTracks;
var indexVideoSelected = [];
var indexAudioSelected = [];

// Loop para verificar as trilhas de vídeo
for (var i = 0; i < numVideoTracks; i++) {
    var numVideoClips = app.project.activeSequence.videoTracks[i].clips.numItems;
    for (var o = 0; o < numVideoClips; o++) {
        if (app.project.activeSequence.videoTracks[i].clips[o].isSelected()) {
            indexVideoSelected.push([i,o])
        }
    }
} 
// Loop para verificar as trilhas de áudio 
for (var i = 0; i < numAudioTracks; i++) {
    var numVideoClips = app.project.activeSequence.audioTracks[i].clips.numItems;
    for (var o = 0; o < numVideoClips; o++) {
        if (app.project.activeSequence.audioTracks[i].clips[o].isSelected()) {
            indexAudioSelected.push([i,o])
        }
    }
}
// Guarda o primeiro e ultimo tempo
var qtosSelectedVideo = indexVideoSelected.length;
var qtosSelectedAudio = indexAudioSelected.length;
var startSelectedVideo = [];
var startSelectedAudio = []; 
var endSelectedVideo = [];
var endSelectedAudio = []; 

for (var x=0; x<qtosSelectedVideo; x++){
var tempoStartVideo = app.project.activeSequence.videoTracks[indexVideoSelected[x][0]].clips[indexVideoSelected[x][1]].start.ticks;
startSelectedVideo.push(tempoStartVideo)
var tempoEndVideo = app.project.activeSequence.videoTracks[indexVideoSelected[x][0]].clips[indexVideoSelected[x][1]].end.ticks;
endSelectedVideo.push(tempoEndVideo)
}

for (var x=0; x<qtosSelectedAudio; x++){
var tempoStartAudio = app.project.activeSequence.audioTracks[indexAudioSelected[x][0]].clips[indexVideoSelected[x][1]].start.ticks;
startSelectedAudio.push(tempoStartAudio)
var tempoEndAudio = app.project.activeSequence.audioTracks[indexVideoSelected[x][0]].clips[indexAudioSelected[x][1]].end.ticks;
endSelectedAudio.push(tempoEndAudio)
}
// Cria subsequência com o número da aula

//Deleta todas as faixa

//Add nova subsequencia no lugar

$.writeln(endSelectedVideo);
$.writeln(startSelectedVideo);
$.writeln(endSelectedAudio);
$.writeln(startSelectedAudio);
 