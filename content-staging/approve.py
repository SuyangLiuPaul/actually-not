#!/usr/bin/env python3
"""审稿后放行：读 <name>.json → 套用 PATCHES（去掉研究员口吻、修措辞）→ 写入 approved/<name>.json。
用法：python3 approve.py quote-world film origin ...
PATCHES[id][('zh'|'en', field)] = [(旧, 新), ...]；新为空串即删除。找不到旧串直接报错，防止静默漏改。
EXTRA[id] = {字段: 值}  直接覆盖（顶层，如 confidence / related）。"""
import json, sys

PATCHES = {
 'world-aristotle-we-are-what-we-repeatedly-do': {
  ('zh','detail'): [
    ('其中带引号的部分才是对《尼各马可伦理学》的引文，「我们是我们反复做的事」是杜兰特自己的总结。维基语录的 Will Durant 页面可对应到该书第 87 页附近，引文来自《尼各马可伦理学》第一、二卷。','这是杜兰特对亚里士多德德性观的概括，措辞出自杜兰特，不是亚里士多德的原话。'),
    ('\n\n需要说明：我只核对到了维基百科和维基语录对该书出处的说明，没有直接翻到 1926 年的原书页面核对分页。',''),
  ],
  ('en','detail'): [
    ('\n\nCaveat: I verified this through Wikipedia and Wikiquote; I did not open the 1926 book itself.',''),
  ],
 },
 'origin-watt-kettle': {
  ('zh','detail'): [('可以肯定的是：瓦特做热学实验时确实用过水壶当锅炉，所以这个故事有一点事实的影子，但「看到壶盖跳动就发明了蒸汽机」找不到可靠的当时记录。','能说的只有：「看到壶盖跳动就发明了蒸汽机」找不到可靠的当时记录。')],
  ('en','detail'): [('What can be said is that Watt really did use a kettle as a boiler in lab experiments, so the tale has a seed of fact; but a reliable contemporary record of \'saw the lid lift and invented the engine\' has not been found.','All that can be said is that no reliable contemporary record of \'saw the lid lift and invented the engine\' has been found.')],
 },
 'world-napoleon-china-sleeping': {
  ('zh','detail'): [('我这里只核对到了维基百科的整理，没有逐条打开 Hicks 或 Fitzgerald 的原文。','')],
  ('en','detail'): [(' I verified this through Wikipedia\'s account only, not the experts\' original texts.','')],
 },
 'world-god-helps-those-who-help-themselves': {
  ('zh','detail'): [('我对这一条只核对到了维基百科的整理，没有打开 Sidney 或富兰克林的原文。','')],
  ('en','detail'): [(' I verified this only through Wikipedia, not Sidney\'s or Franklin\'s texts.','')],
 },
 'world-churchill-liberal-at-twenty': {
  ('zh','detail'): [('\n\n另有搜索结果提到，丘吉尔中心表示没有人听到过丘吉尔这么说；我没有能打开该中心的页面核对，只能当作旁证。','')],
  ('en','detail'): [('\n\nA search result also mentioned that the Churchill Centre says there is no record of anyone hearing him say it; I could not open that page, so treat it as corroboration only.','')],
 },
}
EXTRA = {}
SKIP = {'film-drowning-loud-splash'}  # 与现有 drowning-silent 重复
URL_FIX = {'http://www.diffordsguide.com/encyclopedia/2292/cocktails/origins-of-the-word-cocktail': 'https://www.diffordsguide.com/encyclopedia/2292/cocktails/origins-of-the-word-cocktail'}
DROP_SOURCES = {'luxun-coffee-genius': 'http://taozhi.cn/a/96.htm', 'word-qiyue-liuhuo': 'https://dict.revised.moe.edu.tw/search.jsp?md=1&word=%E4%B8%83%E6%9C%88%E6%B5%81%E7%81%AB'}
ADD_SOURCES = {
 'film-space-sound': ('史密森尼国家航空航天博物馆 —— How Things Fly：声音在太空里怎么传播', 'Smithsonian National Air and Space Museum — How Things Fly: how does sound travel in space?', 'https://howthingsfly.si.edu/ask-an-explainer/how-does-sound-travel-space'),
}

import re
VOICE_ZH = [
 (r'我把', '本站把'), (r'我在《', '本站在《'), (r'我没有', '本站没有'), (r'我没能', '本站没能'), (r'我没找到', '本站没找到'),
 (r'我能找到的', '能找到的'), (r'我能核实到的是', '能核实到的是'), (r'我只能', '只能'), (r'我找不到', '找不到'),
 (r'我这里只', '这里只'), (r'我对这一条只', '这一条只'), (r'我查到的', '本站查到的'), (r'我在维基', '本站在维基'), (r'我用本地的', '本站用'), (r'我把本地的', '本站把'), (r'我也没有', '本站也没有'), (r'我对「', '本站对「'), (r'我没查到', '本站没查到'),
]
VOICE_EN = [
 (r"(?<![\'\"“‘])\bI (could not|did not|have not|searched|found|verified|checked|could|can only|can say|only)\b", r'We \1'),
 (r"\bso I can only\b", 'so we can only'), (r"\bWe can say\b", 'All we can say'), (r"\bI am only\b", 'we are only'),
 (r"\bI do not present\b", 'we do not present'), (r"\bI couldn't\b", "we couldn't"), (r'document I read', 'document reviewed'),
]
CJK = '\u4e00-\u9fff'
def fullwidth(t):
    t = re.sub(r'(?<=[%s」』）》”])\s*,\s*(?=\S)' % CJK, '，', t)
    t = re.sub(r'(?<=[%s」』）》”]):(?!//)' % CJK, '：', t)
    t = re.sub(r'(?<=[%s」』）》”]);' % CJK, '；', t)
    t = re.sub(r'(?<=[%s」』）》”])\?' % CJK, '？', t)
    t = re.sub(r'(?<=[%s」』）》”])!' % CJK, '！', t)
    t = re.sub(r'\(([^()]*[%s][^()]*)\)' % CJK, r'（\1）', t)
    return t

def voice(e):
    for k in ('belief','truth','detail','origin','instead'):
        e[k] = fullwidth(fullwidth(e[k]))
    for s_ in e['sources']:
        s_['label'] = fullwidth(s_['label'])
    for k in ('belief','truth','detail','origin','instead'):
        # 引文里的「我…」是原话，只改引号外的研究员口吻
        parts = re.split(r'(「[^」]*」|『[^』]*』|“[^”]*”)', e[k])
        for i in range(0, len(parts), 2):
            for pat, rep in VOICE_ZH: parts[i] = re.sub(pat, rep, parts[i])
        e[k] = ''.join(parts)
        for pat, rep in VOICE_EN: e['en'][k] = re.sub(pat, rep, e['en'][k])
    return e

def apply(e):
    p = PATCHES.get(e['id'], {})
    for (lang, field), subs in p.items():
        tgt = e if lang == 'zh' else e['en']
        for old, new in subs:
            if old not in tgt[field]:
                raise SystemExit(f"补丁未命中 {e['id']} {lang}.{field}: {old[:30]}…")
            tgt[field] = tgt[field].replace(old, new)
    e.update(EXTRA.get(e['id'], {}))
    voice(e)
    for lst in (e['sources'], e['en']['sources']):
        for x in lst:
            if x.get('url') in URL_FIX: x['url'] = URL_FIX[x['url']]
    if e['id'] in DROP_SOURCES:
        u = DROP_SOURCES[e['id']]
        e['sources'] = [x for x in e['sources'] if x.get('url') != u]; e['en']['sources'] = [x for x in e['en']['sources'] if x.get('url') != u]
    if e['id'] in ADD_SOURCES:
        zl, el, u = ADD_SOURCES[e['id']]
        e['sources'].insert(0, {'label': zl, 'url': u}); e['en']['sources'].insert(0, {'label': el, 'url': u})
    return e

for name in sys.argv[1:]:
    data = [apply(e) for e in json.load(open(f'{name}.json')) if e['id'] not in SKIP]
    drop = ('verification',)
    for e in data:
        for k in drop: e.pop(k, None)
    json.dump(data, open(f'approved/{name}.json', 'w'), ensure_ascii=False, indent=2)
    print(name, len(data))
