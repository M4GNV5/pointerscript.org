var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.setOption("fontSize", 11);

var out = document.getElementById("outtext");

var ws = new WebSocket("ws:/127.0.0.1:6060");
ws.onmessage = function(msg)
{
	console.log(msg.data);
	out.innerHTML += msg.data.replace(/</g, "&lt;");
};
ws.onerror = function(e)
{
	//out.innerHTML += e.toString();
};

function runCode()
{
	out.innerHTML = "";
	try
	{
		ws.send(editor.getValue());
	}
	catch(e)
	{
		out.innerHTML += e.toString() + "<br />";
	}
}
