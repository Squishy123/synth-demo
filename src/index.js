const { Midi } = require('@tonejs/midi');
const Tone = require('Tone');

(async () => {
    const midi = await Midi.fromUrl("static/test.mid");
    let container = document.querySelector('.notes');
    let synths = [];
    console.log(midi)

    midi.tracks.forEach((track, i) => {
        let synth = new Tone.PolySynth(10, Tone.Synth, {
            envelope: {
                attack: 0.02,
                decay: 0.1,
                sustain: 0.3,
                release: 1
            }
        }).toMaster()
        let now = Tone.now() + 0.5
        track.notes.forEach(note => {
            synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
            Tone.Draw.schedule(function () {

                if(i == 0) {
                    document.querySelector('#note1').innerHTML = `${note.name}`
                } else {
                    document.querySelector('#note2').innerHTML = `${note.name}`
                }

                let c = document.createElement('div')
                console.log(`${note.duration * 100}px`)
                c.style.height = `${note.duration * 50}px`
                c.style.width = "100px"
                c.style.backgroundColor = "green"
                container.appendChild(c)
                setTimeout(function () {
                    container.removeChild(c)
                }, note.duration)
            }, note.time + now)
        });
        synths.push(synth)
    })
})()
