let speech = new SpeechSynthesisUtterance();

var Gameobjname =null;
let voices = [];
function SetGameObjectName(name)
{
  Gameobjname =name;
  
  voices = window.speechSynthesis.getVoices();
  
  var formattedVoices="";
  
  voices.forEach((item) => {
  formattedVoices+=(item.name+' (' + item.lang + ')'+",");
});
  
  formattedVoices = formattedVoices.slice(0, -1);
  window.Gameinstance.SendMessage(Gameobjname, "FillUpVoiceOptions", formattedVoices);
}


window.speechSynthesis.onvoiceschanged = () => {
 
};

function AdjustRate(rate)
{
  speech.rate = rate;
}

function AdjustVolume(volume)
{
  speech.volume = volume;
}

function AdjustPitch(pitch)
{
  speech.pitch = pitch;
}

function ChangeVoice(index){
  speech.voice = voices[index];
}

function StartToSpeak(msg){
  speech.text = msg;

  speech.addEventListener("end", (event) => {
     window.Gameinstance.SendMessage(Gameobjname, "OnSpeechEnded", event.elapsedTime);
  });

  window.speechSynthesis.speak(speech);
}

function CancelSpeech(){
  window.speechSynthesis.cancel();
}
