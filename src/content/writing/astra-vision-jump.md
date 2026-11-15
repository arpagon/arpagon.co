---
title: "GPT-6 Astra: OpenAI’s leap in visual understanding"
date: 2026-10-10
lang: en
description: "GPT-6 Astra ended a long stretch in which a Gemini was the vision model to beat, with its biggest gains in detection and visual reasoning. Written October 10; updated November 14 after Gemini 4 took the lead back."
cover: /media/writing/astra-vision-jump/leadership.png
---

GPT-6 Astra feels like a substantial jump in vision and video understanding. In my use, object recognition got better, but the bigger change was how well it understood what the visual information means.

That stands out because, for most of the last two years, the vision model to beat was usually a Gemini.

## Gemini set the pace

![Timeline of dated public claims of a #1 vision model, December 2024 to September 2026, in four lanes. LMArena Vision: Gemini 2.0 Flash Thinking, Gemini 2.5 Pro twice, Gemini 3 Pro twice, then Claude Opus 4.7 in April 2026. Artificial Analysis MMMU-Pro: Gemini 3 Pro twice. Vendor MMMU and MMMU-Pro tables: Gemini 2.5 Pro, o3, Gemini 3 Pro, GPT-5.5. Roboflow in September 2026: Qwen3.8 Max and Gemini 3.8 Flash, then GPT-6 Astra on September 5 and 17.](/media/writing/astra-vision-jump/leadership.png)

*Each dot is a dated public claim that a model was first: a leaderboard post, a benchmark maintainer's post, or a vendor's comparison table. The gaps between dots are unknown. Vendor tables only compare the models the vendor chose to include.*

LMArena put a Gemini at the top of its Vision leaderboard in [December 2024](https://x.com/arena/status/1869793847548817563) (Gemini 2.0 Flash Thinking), in [May](https://x.com/arena/status/1919774743038984449) and [June 2025](https://x.com/arena/status/1930658527158165841) (Gemini 2.5 Pro, about 70 points ahead in May), and in [November 2025](https://x.com/arena/status/1990813759938703570) (Gemini 3 Pro, 1328, 70 points above Gemini 2.5). At the end of December, [Arena said](https://x.com/arena/status/2006502793692230071) Gemini 3 Pro had held first place since mid-November. The day Gemini 3 Pro launched, [Artificial Analysis](https://x.com/ArtificialAnlys/status/1990813106478715098) ranked it first on MMMU-Pro, with GPT-5.1 second.

The lead was never complete. Google's own [June 2025 report](https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf) lists o3 at 82.9% on MMMU, above Gemini 2.5 Pro's 82.0%. By February 2026 Arena described Gemini 3.1 Pro as [top 3 in Vision](https://x.com/arena/status/2024519891295089063), not first. In April, [Claude Opus 4.7 took first place](https://x.com/arena/status/2046224760657658239) in Arena Vision, and OpenAI's [GPT-5.5 table](https://openai.com/index/introducing-gpt-5-5/) put it at 81.2% on MMMU-Pro against 80.5% for Gemini 3.1 Pro.

The week before Astra, Roboflow's evaluations had no single leader. [Qwen3.8 Max led object detection](https://x.com/skalskip92/status/2095235297730568258) at 77.1 mAP@50, and [Gemini 3.8 Flash ranked first](https://x.com/skalskip92/status/2095577965283148091) in image reasoning and data extraction.

## The September jump

Astra came out on September 3. Two days later, Roboflow's Piotr Skalski posted ["Gemini dethroned"](https://x.com/skalskip92/status/2096317264463012261): Astra ranked first in object detection at both reasoning efforts, with 82.1 mAP@50 at low effort and 83.6 at high. By [September 17](https://roboflow.com/blog/gpt-6-astra-for-segmentation) Roboflow listed it first overall and in detection, and on September 18 it called Astra [the strongest vision model it had tested](https://roboflow.com/blog/gpt-6-astra-vision).

![Roboflow object detection in mAP@50, low and high effort. GPT-6 Astra 82.1 and 83.6; GPT-6.1 Sol 80.8 and 81.6; Qwen3.8 Max 76.7 and 78.4; GPT-6 Sol 74.7 and 76.4; GPT-5.6 Sol 68.4 at low effort only.](/media/writing/astra-vision-jump/detection-september.png)

*Roboflow object detection, from posts dated [September 18](https://x.com/skalskip92/status/2101020137579073915), [22](https://x.com/skalskip92/status/2102437059726028942) and [29](https://x.com/skalskip92/status/2105062495903994041), 2026. Low and high are reasoning-effort settings. The axis starts at 50.*

Within OpenAI's own line, low-effort detection goes from 68.4% for GPT-5.6 Sol to 74.7% for GPT-6 Sol and 82.1% for Astra. From Sol to Astra that is 13.7 percentage points, or about 20% relative. Astra at low effort is 5.4 points ahead of Qwen3.8 Max (76.7%), and Roboflow reports that it beats every competing model even when those models run at high effort. High effort adds 1.5 points but [doubles the cost per image](https://x.com/skalskip92/status/2101020166586859789), from $0.050 to $0.101, and takes 32 seconds instead of 11.

Detection is not the only gain. Astra [leads Roboflow's visual-reasoning eval](https://x.com/skalskip92/status/2101020161889206379) at 91.2% with high effort, and on October 9 it [led text localization and recognition](https://x.com/skalskip92/status/2108603111275208792) at both efforts (75.5% low, 76.8% high).

Locating a container is one capability. Reading its weight limit, identifying the relevant load values, and deciding whether their sum exceeds that limit is a different one, and Roboflow demonstrates Astra doing it. It also shows the model deriving an unlabeled distance from a technical drawing.

Both examples combine perception with interpretation and calculation. As demonstrations, they don't establish reliability, but they illustrate the difference between recognizing a scene and reasoning about it.

## Understanding across video frames

Roboflow also tests Astra on basketball footage sampled at one frame per second. The model keeps track of player identities across separate plays and combines evidence across frames to recover jersey numbers, since a number hidden in one image may become readable in another.

This is a demonstration, not a benchmark score, and because the model works from sampled images it is no evidence of native video input. Still, connecting observations across time is a meaningful improvement over describing isolated frames.

## What did OpenAI change?

Roboflow links these capabilities to OpenAI's emphasis on computer use: operating an interface requires locating elements, reading text, and understanding what those elements do. The link is plausible, but it does not isolate the cause of the benchmark gains.

The results do not establish that OpenAI added a new vision encoder, a special video architecture, or an extra zoom tool. Those mechanisms remain unverified in the sources reviewed here.

What the evidence shows is a gain in capability; OpenAI has not disclosed an architectural breakthrough behind it. The lead is narrow in places. Astra leads [structured JSON extraction](https://x.com/skalskip92/status/2108603094435029098) at low effort (91.8%), but Claude Opus 5.5 leads it at high effort (94.1%). GPT-6.1 Sol comes [within about 1.2 points in low-effort detection](https://x.com/skalskip92/status/2105062486726824345) at 78% lower cost, according to Roboflow. The largest gains are where visual systems become more useful: connecting details, interpreting relationships, and reasoning over what changes. That explains the jump I felt better than object detection alone does.

## Update, November 14, 2026

Five weeks after I wrote this, Astra no longer leads these benchmarks.

- **October 13.** Roboflow: [Gemini 4 Argon "dethroned" Astra](https://x.com/skalskip92/status/2110057814215291370). Detection at high effort: 85.1% against 83.6%; at low effort, 82.5% against 82.1%. Text localization at high effort: 84.7% against 76.8%.
- **October 15.** StarZero, a video-understanding benchmark launched the day before, put [Argon in first place](https://x.com/raduamarie/status/2110767383602200906).
- **October 27.** Roboflow: OpenAI's own [GPT-6.1 Terra beats Astra](https://x.com/skalskip92/status/2115163487177674991) on text, detection and counting, at about 92% lower cost.
- **November 10–11.** Roboflow: [Gemini 4 Carbon is the top overall vision model](https://x.com/roboflow/status/2120567516099449064) on its benchmarks.

![Roboflow Vision Evals at low effort, November 12 snapshot, plotted by model release date from June 2025 to November 2026, with step lines for the best Gemini and best OpenAI score so far. Overall: Gemini 3.5 Flash 81.8, GPT-6 Astra 83.4, Gemini 4 Argon 87.5, GPT-6.1 Terra 85.8, Gemini 4 Carbon 89.4. Detection: GPT-6 Astra jumps to 82.1 above Qwen3.8 Max 76.7 and the best earlier Gemini at 70.6; GPT-6.1 Terra later leads at 84.7.](/media/writing/astra-vision-jump/roboflow-history.png)

*Roboflow's current five-task suite at low effort, read from the [November 12 snapshot](https://playground.roboflow.com/evals) and plotted by model release date. These are scores measured now, not at each release. The lines track the best Gemini and OpenAI score released up to each date. The dashed line marks October 10.*

The longer series supports the September picture and shows where the jump was. In detection, Astra's 82.1% was well above anything released before it: Qwen3.8 Max at 76.7% and the best Gemini at 70.6%. In visual reasoning, Astra's 87.2% beat the best earlier model, Gemini 3.5 Flash, at 82.1%. In counting and identification, it did not lead even at release: 80.2% for counting against 81.1% for Qwen3.8 Max, and 89.6% for identification, where several Gemini and Claude models score 97% or more.

On the current snapshot, Carbon averages 89.4% across the five tasks against Astra's 83.4%, with Argon at 87.5% and Terra at 85.8%. Terra leads low-effort detection at 84.7%, ahead of Carbon (84.5%), Argon (82.5%) and Astra (82.1%).

![StarZero video understanding by model release date, with 95 percent confidence intervals. GPT-5.6 Sol 58.9 plus or minus 5.2; GPT-6 Astra 76.7 plus or minus 6.2, close to Gemini 3.8 Flash at 76.1 and Claude Opus 5.5 at 77.7; Gemini 4 Argon 81.1 plus or minus 1.9; Gemini 4 Hydrogen 83.8 plus or minus 2.0.](/media/writing/astra-vision-jump/video.png)

*[StarZero](https://starzero.ai/video-understanding-leaderboard/) on November 13, best tested setting per model, mostly at about one frame per second, with 95% confidence intervals.*

StarZero gives the first independent number for Astra's video gains. Astra scores 76.7 ± 6.2, against 58.9 ± 5.2 for GPT-5.6 Sol, so the intervals do not overlap. But Astra sits next to Gemini 3.8 Flash (76.1) and Claude Opus 5.5 (77.7), and Gemini 4 Hydrogen now leads at 83.8 ± 2.0, an interval that overlaps Astra's.

Elsewhere, Artificial Analysis's rounded MMMU-Pro figures put [Carbon at 89%](https://artificialanalysis.ai/evaluations/mmmu-pro), Argon and Claude Opus 5.5 at 88%, and Astra at 87%. On Arena Vision's November 8 snapshot, [Claude Fable 5 is first and Astra is 21st](https://arena.ai/leaderboard/chat/vision). I found no Arena post that ever put Astra first.

Astra's jump was real, and it put an OpenAI model at the top of Roboflow's evals for about five weeks. Since mid-October the Gemini 4 models have led most of these boards, and OpenAI's GPT-6.1 Terra now beats Astra in detection.

---

**Data note.** The body uses Roboflow posts and articles dated September 2 to October 9, 2026, Arena and Artificial Analysis posts, and comparison tables from Google and OpenAI. Effort settings, test sets and comparison lists differ between these sources, and vendor tables are not independent. In the update, Roboflow's November 12 snapshot uses three-run means for newer models and single runs for older ones; OCR is a single preliminary run, and Roboflow's ± is half the observed range, not a confidence interval. StarZero reports 95% intervals across five runs (four for some models) and uses each model's best tested setting. Release dates are not evaluation dates. Sources checked November 14, 2026. [Plotted data](/media/writing/astra-vision-jump/data.json) · [Leadership chart SVG](/media/writing/astra-vision-jump/leadership.svg) · [September detection SVG](/media/writing/astra-vision-jump/detection-september.svg) · [Roboflow history SVG](/media/writing/astra-vision-jump/roboflow-history.svg) · [Video chart SVG](/media/writing/astra-vision-jump/video.svg).

**Model-level sources:** [GPT-5.6 Sol](https://playground.roboflow.com/models/openai/gpt-5-6-sol), [GPT-6 Astra](https://playground.roboflow.com/models/openai/gpt-6-astra), [Gemini 4 Argon](https://playground.roboflow.com/models/google/gemini-4-argon), [Gemini 4 Carbon](https://playground.roboflow.com/models/google/gemini-4-carbon), [GPT-6.1 Terra](https://playground.roboflow.com/models/openai/gpt-6-1-terra). Release dates: [GPT-5.6](https://openai.com/index/gpt-5-6/), [ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes).
