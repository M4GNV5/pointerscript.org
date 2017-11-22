var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/pointer_script");
editor.setOption("fontSize", 14);

var runBtn = document.getElementById("runBtn");
var out = document.getElementById("outtext");

var ws = new WebSocket("wss://pointerscript.org:8003");
ws.onopen = function()
{
	runBtn.disabled = false;
	runBtn.innerHTML = "run";
};
ws.onmessage = function(msg)
{
	console.log(msg.data);

	if(msg.data == "running")
	{
		runBtn.innerHTML = "running";
		out.innerHTML = "";
	}
	else if(msg.data == "ready")
	{
		runBtn.disabled = false;
		runBtn.innerHTML = "run";
	}
	else
	{
		out.innerHTML += msg.data.replace(/</g, "&lt;") + "\n";
	}
};
ws.onerror = function(e)
{
	runBtn.disabled = true;
	runBtn.innerHTML = "error";
};

setInterval(function()
{
	ws.send("");
}, 20000);

function runCode()
{
	runBtn.innerHTML = "starting";
	try
	{
		ws.send(editor.getValue());

		runBtn.disabled = true;
	}
	catch(e)
	{
		out.innerHTML += e.toString() + "<br />";
	}
}
