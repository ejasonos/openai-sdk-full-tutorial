/* Array to string test

var tmp_msg = []
tmp_msg.push("Welcome to")
tmp_msg.push("uniben carlex")

console.log(tmp_msg.join(" "))
/* */

/* random user id test
import { randomUUID } from 'crypto'
console.log(randomUUID())
/* */

/* username and email on runtime nodejs
import readline from "readline";

// START
const agent = async () => {
  var email = "";

  var rl_1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Enter your email: ",
  });

  await rl_1.prompt();
  await rl_1.on("line", async (line) => {
    email = await line;
    if (email) {
      await agentLoop();
    }
  });

  const agentLoop = async () => {
    if (email) {
      console.log(await `Welcome, ${email}`);

      var rl_2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "User: ",
      });

      await rl_2.prompt();
      await rl_2.on("line", async (line) => {
        await rl_2.prompt();
      });
    }
  };
};
await agent();
/* */

/* Test pdf-parse module
import fs from 'fs'
import { PDFParse } from 'pdf-parse'
const buffer = fs.readFileSync('./exam-prep-agent/pdf/Introduction to Digital Signal Processing.pdf')
const parser = new PDFParse({data: buffer});
const result = await parser.getText()
await parser.destroy()
console.log(result.text)
/* */

/* Testing the chunk text function
const data = `
INTRODUCTION TO DIGITAL SIGNAL
PROCESSING (1)
Notes By
Isi Edeoghon (PhD)
1       ISI.EDEOGHON@UNIBEN.EDU

-- 1 of 54 --

WHAT IS DIGITAL SIGNAL PROCESSING (DSP)?
Digital Signal Processing is the process of representing signals in a discrete
mathematical sequence of numbers and analyzing, modifying, and extracting the
information contained in the signal by carrying out algorithmic operations and
processing on the signal.
2       ISI.EDEOGHON@UNIBEN.EDU

-- 2 of 54 --

DSP BREAKDOWN
DIGITAL - means discrete in nature – i.e. the signal levels are chosen from a finite set of
levels, as opposed to continuous or analog signals, which can have an infinite number of
levels. In practice, digital nearly always means binary, that is, two-level signals – our
standard TTL or CMOS levels as used in computers and other digital systems. Note that
signals used in DSP systems may be developed from analog signals by sampling and analog-
to-digital conversion or may be available as digital signals initially, as from another digital
system.
3       ISI.EDEOGHON@UNIBEN.EDU

-- 3 of 54 --

DSP BREAKDOWN
DSP signals are also discrete in time, i.e. they represent samples taken at specific
instants in time. Thus, we use notation like x[n] or y[n] to represent these signals, where
n is an integer that represents, effectively, the sample number.
4       ISI.EDEOGHON@UNIBEN.EDU

-- 4 of 54 --

DSP BREAKDOWN
PROCESSING – refers to the applications we want to implement or operations we
want to perform on the digital signal. The two major, end-result applications for
digital signal processing are digital filters and the fast Fourier transform (FFT).
However, there are innumerable other applications or types of processing, carried out
because they are important in themselves or because they are steps in implementing
filters or FFTs.
5       ISI.EDEOGHON@UNIBEN.EDU

-- 5 of 54 --

EXERCISE
What is FFT?
Why is it important in DSP?
Give areas of application of FFT.
6       ISI.EDEOGHON@UNIBEN.EDU

-- 6 of 54 --

WHAT IS A SIGNAL?
SIGNAL – means some physical quantity whose variations convey information. A signal
can be mechanical, hydraulic, pneumatic, optical (visible, UV or infra-red light),
temperature, etc. However, we generally deal with electrical signals, either because
they were initially developed as electrical, or because they have been converted to
electrical.
7       ISI.EDEOGHON@UNIBEN.EDU

-- 7 of 54 --

BASIC ELEMENT OF A DSP SYSTEM
8       ISI.EDEOGHON@UNIBEN.EDU

-- 8 of 54 --

DSP STEP BY STEP
✓The first step is to get an electrical signal. The transducer (in the previous diagram, a
microphone) converts sound into an electrical signal. Any transducer can be used
✓Once we have an analog electrical signal, we pass it through an operational
amplifier (Op-Amp) to condition the analog signal. Basically, we amplify the signal.
Or limit it to protect the next stages. Signal conditioning is the manipulation of a
signal in a way that prepares it for the next stage of processing.
9       ISI.EDEOGHON@UNIBEN.EDU

-- 9 of 54 --

DSP STEP BY STEP
✓The anti-aliasing filter is an essential step in the conversion of analog to a digital
signal. It is a low-pass filter. Meaning, it allows frequencies up to a certain threshold
to pass. It attenuates all frequencies above this threshold. These unwanted
frequencies make it difficult to sample an analog signal.
✓The next stage is a simple analog-to-digital converter (ADC). This unit takes in
analog signals and outputs a stream of binary digits.
10      ISI.EDEOGHON@UNIBEN.EDU

-- 10 of 54 --

DSP STEP BY STEP
✓The heart of the system is the digital signal processor. These days we use CMOS
chips (even ULSI) to make digital signal processors. In fact, modern processors, like the
Cortex M4 have DSP units built inside the SoC (System on Chip). These processor units
have high-speed, high data throughputs, and dedicated instruction sets.
11      ISI.EDEOGHON@UNIBEN.EDU

-- 11 of 54 --

DSP STEP BY STEP
✓The heart of the system is the digital signal processor. These days we use CMOS
chips (even ULSI) to make digital signal processors. In fact, modern processors, like the
Cortex M4 have DSP units built inside the SoC (System on Chip). These processor units
have high-speed, high data throughputs, and dedicated instruction sets.
12      ISI.EDEOGHON@UNIBEN.EDU

-- 12 of 54 --

DSP OUTPUT
✓The digital-to-analog converter does what its name implies. It’s necessary for the
slew rate of the DAC to match the acquisition rate of the ADC.
✓The smoothing filter is another low-pass filter that smoothens the output by removing
unwanted high-frequency components.
✓The last op-amp is just an amplifier.
✓The output transducer is a speaker in this example
13      ISI.EDEOGHON@UNIBEN.EDU

-- 13 of 54 --

EXERCISE
What is Slew Rate?
Why does the slew rate of the DAC have to match the acquisition rate of the ADC?
ISI.EDEOGHON@UNIBEN.EDU 14

-- 14 of 54 --

APPLICATIONS OF A DIGITAL SIGNAL PROCESSING
SYSTEM
1. Telecommunication
For echo cancellation.
Equalization – Think about tuning your radio for bass and treble).
Filtering – Removing unwanted signals using specially designed filters like the Infinite
Impulse Response Filter (IIR).
Multiplexing and repeating signals.
15      ISI.EDEOGHON@UNIBEN.EDU

-- 15 of 54 --

APPLICATIONS OF A DIGITAL SIGNAL PROCESSING
SYSTEM
2. Instrumentation and Control
In designing Phase Locked Logic (PLL).
Noise reduction circuits.
Compression of signals.
Function generators.
3.Digital Image Processing
Compression of an image.
16      ISI.EDEOGHON@UNIBEN.EDU

-- 16 of 54 --

APPLICATIONS OF A DIGITAL SIGNAL PROCESSING
SYSTEM
4. Enhancement, reconstruction, and restoration of an image.
Analysis or face detection (like Snapchat).
5. Speech Processing
Digital audio synthesis.
Speech recognition and analysis.
17      ISI.EDEOGHON@UNIBEN.EDU

-- 17 of 54 --

APPLICATIONS OF A DIGITAL SIGNAL PROCESSING
SYSTEM
6. Medicine
X-rays, ECGs, EEGs.
7. Signal filtering
Noise removal and shaping of signal spectrums.
18      ISI.EDEOGHON@UNIBEN.EDU

-- 18 of 54 --

APPLICATIONS OF A DIGITAL SIGNAL PROCESSING
SYSTEM
8. Military
Sonar and navigation.
Analysis after tracking in radars.
9. Consumer electronics
Music players
Professional music turntables (like the ones DJs use).
19      ISI.EDEOGHON@UNIBEN.EDU

-- 19 of 54 --

ADVANTAGES OF DIGITAL SIGNAL PROCESSING
(DSP) SYSTEM
The main advantage of Digital Signal Processing is its simplicity compared to analog Signal
Processing. Digital Signal Processing can perform complicated signal analysis with relative ease
without the less complicated circuits.
Also, processing can be modified easily with simple changes in software, connoting flexibility.
In DSP we have access to many error detection and correction features: for example parity
generation and correction.
20      ISI.EDEOGHON@UNIBEN.EDU

-- 20 of 54 --

ADVANTAGES OF DIGITAL SIGNAL PROCESSING
(DSP) SYSTEM
Data storage is also much easier.
Since digital storage devices are becoming cheaper by the day, the storage of data
is much easier digital forms.
It is also easier to transport and recreate digital data with 100% fidelity.
21      ISI.EDEOGHON@UNIBEN.EDU

-- 21 of 54 --

DISADVANTAGES OF DIGITAL SIGNAL PROCESSING (DSP)
SYSTEM
• DSPs are made out of a large number of transistors and these transistors together
consume a lot more power than analog signal processors.
•DSP has a higher learning curve required for the operation of DSP Systems.
22      ISI.EDEOGHON@UNIBEN.EDU

-- 22 of 54 --

DISADVANTAGES OF DIGITAL SIGNAL PROCESSING (DSP)
SYSTEM
•Each DSP possesses different hardware architecture and software instructions, due to
these issues highly skilled engineers are needed to program devices and proper
training on DSP is required to program various applications.
23      ISI.EDEOGHON@UNIBEN.EDU

-- 23 of 54 --

EXERCISE
•What are filters in digital signal processing?
•What are the types of filters in digital signal processing?
•What are the disadvantages of digital signal processing?
24      ISI.EDEOGHON@UNIBEN.EDU

-- 24 of 54 --

CHARACTERISTICS OF DSP SYSTEMS
Linearity - Linearity dictates that for a single input, the output is proportional to the input, and for
two or more inputs, the output must be the sum of the individual responses of the two inputs.
Mathematically, this is expressed as:
if x1[n] produces y1[n], and x2[n] produces y2[n],
then ax1[n] + bx2[n] produces ay1[n] + by2[n]
Linearity is the basis for the concept of superposition and for convolution which we will see shortly.
Time-invariant - We assume the system properties do not vary with time (or at least over the time
period we are concerned about.)
25      ISI.EDEOGHON@UNIBEN.EDU

-- 25 of 54 --

CHARACTERISTICS OF DSP SYSTEMS
Causality - Causality implies that output changes do not occur before input changes.
Although this cannot happen in a real situation, non-causal considerations sometimes
arise in theoretical derivations. If all the samples for a certain signal have been
collected and stored, causality is not an issue, since all samples both before and after
a selected value of n are available. In addition, any non-causal signal can be made
causal just by delaying all the samples by an appropriate amount.
26      ISI.EDEOGHON@UNIBEN.EDU

-- 26 of 54 --

CHARACTERISTICS OF DSP SYSTEMS
Most real signals and systems we deal with are causal, but just as an example, we will
look at one non-causal system. To that end, consider the moving-average system,
frequently used to smooth a set of data points.
The moving average system computes the average of a certain number of points
around a specific point, then replaces the value at that point with the average. Thus, a
typical moving average computation might be to take the average of the two points
prior to a certain point, plus the point itself, and the two points past the point in
question.
27      ISI.EDEOGHON@UNIBEN.EDU

-- 27 of 54 --

SAMPLING OF ANALOGUE SIGNAL
Let us now consider the nature of the signals used in digital signal processing. These
signals are frequently, but not always, developed by sampling a continuous-time
signal. Sometimes they are called discrete-time signals, to reflect the fact that they
have meaning only at discrete points in time. Sampled signals are also discrete in
amplitude as well as time, since the normal analog to digital conversion process is
finite in its resolution, and thus forces the amplitude to be chosen from a finite set of
values.
28      ISI.EDEOGHON@UNIBEN.EDU

-- 28 of 54 --

SAMPLING OF ANALOGUE SIGNAL
If we call the sampled signal x[n], to indicate that the values of the signal are a
function of the sample number or index “n”, then the individual values of the signal are
represented by x[0], x[1], x[2], etc., as shown by the following:
29      ISI.EDEOGHON@UNIBEN.EDU

-- 29 of 54 --

SAMPLING OF ANALOGUE SIGNAL
Note that the index n can be negative as well as positive, to indicate that the signal sample was
taken before the point designated n=0. This is not really a complication, since the definition of
n=0 is frequently arbitrary.
Since the digital signals represent samples of continuous-time signals, taken at discrete points in
time, they are actually a set of numbers representing the values of the continuous-time signal at
the instants in time at which it was sampled. For example, typical sequences might be:
1,2,3,4,5 or 2, -4, -6, 8 or 0.330, -1.25, 5.69, 3.45, -5.77 etc.
30      ISI.EDEOGHON@UNIBEN.EDU

-- 30 of 54 --

SAMPLING OF ANALOGUE SIGNAL
Thus we have to get accustomed to the idea that the digital signals we deal with are
just a string or sequence of numbers. In fact, they are usually referred to as sequences
instead of signals. This string or sequence of numbers is handled just like any other set
of numeric data: it can be treated as a vector, stored in an array format, manipulated
by a spreadsheet, etc. A sequence is frequently called a vector, although it has no
physical meaning like a force vector or electromagnetic field vector does.
31      ISI.EDEOGHON@UNIBEN.EDU

-- 31 of 54 --

SAMPLING OF ANALOGUE SIGNAL
It is also quite possible that the sequence of numbers was not derived by sampling a
continuous-time signal They may represent data collected from measurements made in
some physical or natural system, such as traffic flow, the growth rate of trees, ocean
water temperature, etc., which actually are sampled quantities, but may be the result
of intermediate calculations.
32      ISI.EDEOGHON@UNIBEN.EDU

-- 32 of 54 --

SAMPLING OF ANALOGUE SIGNAL
There are several special sequences used in DSP that are not derived from the
sampling of a real-world signal. Rather, they are defined instead of sampled and thus
have somewhat different notations.
The first is the unit impulse. It is designated as d[n], and defined as 1 for n=0, and 0
elsewhere. Graphically, it is =>
33      ISI.EDEOGHON@UNIBEN.EDU

-- 33 of 54 --

SAMPLING OF ANALOGUE SIGNAL
The unit impulse is particularly important in DSP because DSP signals, being just
sequences of numbers, can be represented by a series of impulses, each weighted to
represent the actual value of the sequence for each value of n. Thus, DSP system
analysis frequently amounts to analysis of the system response to a sequence of
impulses individually, and subsequent superposition or addition of the individual
responses to find the complete response to the input sequence.
34      ISI.EDEOGHON@UNIBEN.EDU

-- 34 of 54 --

SAMPLING OF ANALOGUE SIGNAL
Another useful defined sequence is the unit step. It is denoted by u[n], and consists of a sequence of impulses with
value of one for n>= 0, and 0 otherwise
35      ISI.EDEOGHON@UNIBEN.EDU

-- 35 of 54 --

SAMPLING OF ANALOGUE SIGNAL
There are several other functions that can be defined, including the exponential
sequence and the sinusoidal sequence. The names are more or less self-explanatory.
Note that there is one major difference in the notation for signals, such as x[n] or y[n],
and defined functions such as the unit impulse d[n] or unit step u[n]. For a signal such
as x[n], there is, in general, a numerical value associated with every value of n. Thus,
x[0] has a distinct value, as does x[5], x[10] and x[-4], etc.
36      ISI.EDEOGHON@UNIBEN.EDU

-- 36 of 54 --

SAMPLING OF ANALOGUE SIGNAL
However, for a defined function such as u[n], its values are determined by its
definition, i.e. d[n] =1 for n=0, and 0 elsewhere; u[n] = 1 for n>=0, and 0
elsewhere. It would not be correct to speak of d[5] or u[-4] or any other value of n.
The values are determined by the definition, not by defining individual samples.
37      ISI.EDEOGHON@UNIBEN.EDU

-- 37 of 54 --

SAMPLING OF ANALOGUE SIGNAL
We can, however, talk about shifted functions. For example, d[n-3] = 1 for n = 3, and
0 elsewhere, and u[n-4] is a unit step that starts at n = 4. Some illustrations are:
38      ISI.EDEOGHON@UNIBEN.EDU

-- 38 of 54 --

SAMPLING OF ANALOGUE SIGNAL
A similar shifting concept applies to signals. The notation x[n-3] represents signal x[n]
delayed by 3 units, and y[n+4] represents the signal y[n] advanced by 4 units.
Consider, for example, the signal we used at the beginning of this section:
39      ISI.EDEOGHON@UNIBEN.EDU

-- 39 of 54 --

SAMPLING OF ANALOGUE SIGNAL
Relationships between the unit step and unit impulse. The unit step can be written in
terms of the unit impulse. Since the step is really represented by an infinite sequence
of impulses starting at 0, the step can be written as:
40      ISI.EDEOGHON@UNIBEN.EDU

-- 40 of 54 --

SAMPLING OF ANALOGUE SIGNAL
Similarly, the unit impulse can be expressed as:
i.e. a unit step less a unit step delayed by one. This form of equation is known as a
first-order difference equation. It is analogous to the differential equation used in the
analysis of continuous-time systems. As we will see shortly, the difference equation is
key in the modeling and analysis of DSP systems.
41      ISI.EDEOGHON@UNIBEN.EDU

-- 41 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
First, we note that for analysis purposes it is convenient to model the conversion process as
the multiplication of the analog signal by an impulse train. Since each impulse has a value of
unity, the individual samples generated by this process will have the value of the analog
signal at the instant that the impulse occurred. The diagram we used initially to illustrate the
derivation of a digital signal from an analog signal is also useful here:
42      ISI.EDEOGHON@UNIBEN.EDU

-- 42 of 54 --

MULTIPLICATION OF AN ANALOG SIGNAL BY AN
IMPULSE TRAIN
43      ISI.EDEOGHON@UNIBEN.EDU

-- 43 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
We can see from the diagram that the multiplication of the analog signal by a train of unit-
valued impulses will produce the sequence of weighted impulses shown.
The fact that the two signals are effectively multiplied allows us to use some traditional
signal processing concepts to describe the results. Recall from a previous theory that
multiplying two single-frequency signals together produces a result containing the sums and
differences of the two original frequencies. This is confirmed by a trig identity which states
that:
44      ISI.EDEOGHON@UNIBEN.EDU

-- 44 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
Since the impulse function contains its fundamental frequency, as well as all of its harmonics,
the sampling operation will produce the spectrum of the analog signal centered about all
the harmonics of the frequency of the impulse. The frequency of the impulse function is called
the sampling frequency.
45      ISI.EDEOGHON@UNIBEN.EDU

-- 45 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
The result of sampling an analog signal having a given spectrum, in which the highest
frequency is fh, is shown below:
46      ISI.EDEOGHON@UNIBEN.EDU

-- 46 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
In effect, copies of the original spectrum appear at all multiples of the sampling frequency. With a sharp filter, it would
be possible to recover all the original information just by separating out the basic spectrum from all the copies.
Note that in this case, the sampling frequency FS is more than twice the highest frequency in the signal, Fh. This is
obvious from the fact that
When this is the case, the original signal can be filtered out from the sampled spectrum. So, although the samples
effectively contain all the copies of the original spectrum, that spectrum can be recovered without distortion.
47      ISI.EDEOGHON@UNIBEN.EDU

-- 47 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
We use the criterion that the original spectrum can be recovered by a sharp filter as a
justification for a certain sampling rate. This does not imply that we really plan to recover
the original spectrum. If that‟s all we did, we haven‟t really accomplished anything. The real
reason for using such a criterion is that if it is satisfied, we know that the signal is correctly
represented by the sampled signal, and that it isn‟t distorted by the alias, which we discuss
next.
48      ISI.EDEOGHON@UNIBEN.EDU

-- 48 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
49      ISI.EDEOGHON@UNIBEN.EDU

-- 49 of 54 --

ALIASING AND ANALOG-TO-DIGITAL CONVERSION
It is obvious from the figure that some energy from the first copy of the spectrum is injected
into the original spectrum, so that even sharp filtering cannot remove that energy from the
original spectrum while keeping all the information in the original signal.
This phenomenon is called aliasing, and the unwanted portion of the first copy of the
spectrum that is aliased into the spectrum of the original signal is referred to as the alias
signal.
50      ISI.EDEOGHON@UNIBEN.EDU

-- 50 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
The presence of the aliasing problem means that the sampling frequency must be at least twice that of the
highest frequency in the signal being sampled. This can be accomplished in two ways:
1. The original signal can be low-pass filtered to reduce the bandwidth to less than half of the sampling
frequency. There are obviously limits on how far the bandwidth can be reduced and still retain the desired
signal characteristics. Sometimes the filter can be a very simple RC filter, as for instance, when the signal is
greatly oversampled – say at a rate 5 to 10 times Fh. In other situations, where oversampling is either
impossible or not convenient, more complex filters will be required. In such cases, attention must be paid to
the phase characteristic as well as the amplitude characteristics of the filter. Non-uniform phase shift, which
is characteristic of many active filters, can be especially troublesome for data signals.
51      ISI.EDEOGHON@UNIBEN.EDU

-- 51 of 54 --

SAMPLING AND ANALOG-TO-DIGITAL CONVERSION
2. The sampling frequency can be increased to more than twice the highest signal
frequency. There are obvious limits on this approach also, as the circuitry involved
must be able to handle the sampling frequency involved.
In practice, a sampling rate of 2.5 to 3 times the highest frequency in the signal is
actually used, because any filters used to recover the original signal are not ideal, and
allowance must be made for that characteristic.
52      ISI.EDEOGHON@UNIBEN.EDU

-- 52 of 54 --

NYQUIST THEOREM
Nyquist Theorem The requirement that the sampling rate exceed twice Fh, the highest
frequency in the signal, is known as the Nyquist Theorem or the Nyquist criterion. The
frequency Fh is called the Nyquist frequency by some authors, and the frequency 2Fh that must
be exceeded by the sampling rate is called the Nyquist rate. Others, including MATLAB, define
the Nyquist Frequency as half the sampling rate.
(To be continued…)
53      ISI.EDEOGHON@UNIBEN.EDU

-- 53 of 54 --

REFERENCES
Introduction to DSP-Digital Signal Processing | FMUSER BROADCAST
https://www.fmradiobroadcast.com/article/detail/Introduction-to-dsp-digital-signal-
processing.html
What is digital signal processing (DSP)? – A complete overview
Umair Hussaini | Published January 10, 2020 | Updated June 2, 2020
https://technobyte.org/dsp-advantages-disadvantages-block-diagram-applications/
INTRODUCTION TO DIGITAL SIGNAL PROCESSING
James Hahn, 2011, Washington State University
ISI.EDEOGHON@UNIBEN.EDU 54

-- 54 of 54 --
`;
console.log(data.length);
// Define our chunk size
const chunk_size = 1000;
for (let i = 0; i < data.length; i += chunk_size) {
  const chunk = data.slice(i, Math.min(i + chunk_size, data.length));
  // process each chunk here
  console.log(chunk);
  break;
}
/* */

/* Testing a flow from get files to chunking
import fs from 'fs'
import path from "path";
import { PDFParse } from "pdf-parse";
// Directory containing your docs
const docsDir = "./exam-prep-agent/pdf/";
// Read all files from company-files directory
const files = await fs.readdirSync(docsDir);

for (const file of files) {
  if (file.endsWith(".pdf")) {
    const filePath = path.join(docsDir, file);
    let way = `.\\` + `${filePath}`;
    let switchSlash = way.replaceAll("\\", "/");
    console.log(switchSlash)
    let buffer = fs.readFileSync(switchSlash);
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const pdfTextResult = result.text
    const pdfTextResultInfo = await parser.getInfo();
    await parser.destroy();

    // Define our chunk size
    const chunk_size = 1000;
    console.log(`chunck size: ${chunk_size}; pdfTextResult.length: ${pdfTextResult.length}`)
    for (let i = 0; i < pdfTextResult.length; i += chunk_size) {
      const chunk = pdfTextResult.slice(
        i,
        Math.min(i + chunk_size, pdfTextResult.length),
      );
      // process chunks
      console.log(await chunk)
      break
    }
  }
}
/* */
