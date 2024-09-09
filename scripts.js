        function importBrutes() {
            var cs = new CSInterface;
            var escola = document.getElementById("escola").value;
            cs.evalScript('var escolaSel = "' + escola + '";')           
            cs.evalScript('$.runScript.importBrutes()')
        }

		function addVideo() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.addVideo()')
        }

		function subVideo() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.subVideo()')
        }

		function addAudio() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.addAudio()')
        }

		function subAudio() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.subAudio()')
        }

        function assetFC() {
            var cs = new CSInterface;
            var molduraFC = document.getElementById("molduraFacecam").value;
            var escola = document.getElementById("escola").value;
            cs.evalScript('var molduraFC = "' + molduraFC + '";')
            cs.evalScript('var escolaSel = "' + escola + '";')  
            cs.evalScript('$.runScript.assetFC()')
        }

        function arrumaTela() {
            var cs = new CSInterface;
            var ladoInst = document.getElementById("ladoInst").value;
            cs.evalScript('var ladoInst = "' + ladoInst + '";')
            cs.evalScript('$.runScript.arrumaTela()')
        }
        
            function arrumaFC() {
            var cs = new CSInterface;
            var ladoInst = document.getElementById("ladoInst").value;
            var molduraFC = document.getElementById("molduraFacecam").value;
            var escola = document.getElementById("escola").value;
            cs.evalScript('var molduraFC = "' + molduraFC + '";')
            cs.evalScript('var escolaSel = "' + escola + '";')  
            cs.evalScript('var ladoInst = "' + ladoInst + '";')
            cs.evalScript('$.runScript.arrumaFC()')
        }
            function arrumaFS() {
            var cs = new CSInterface;
            var ladoInst = document.getElementById("ladoInst").value;
            cs.evalScript('var ladoInst = "' + ladoInst + '";')
            cs.evalScript('$.runScript.arrumaFS()')
        }

        
        function dupVideo() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.dupVideo()')
        }
        
        function copyParam() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.copyParam()')
        }

        function pasteParam() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.pasteParam()')
        }

        function resetParam() {
            var cs = new CSInterface;
            cs.evalScript('$.runScript.resetParam()')
        }

        function autoCrop() {
            var cs = new CSInterface;
            var faixaVideo = document.getElementById("autocrop").value;
            cs.evalScript('var faixaVideo = "' + faixaVideo + '";')
            cs.evalScript('$.runScript.autoCrop()')
        }
        
 
