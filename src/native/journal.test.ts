import { describe,it,expect } from 'vitest'
import { dailyQuestions,reviewQuestions,resumeStep,localDay,type Discovery } from './journal'
import { PLAY_QUESTIONS } from '../data/play'
const record=(id:string,shownAt:string,correct:boolean|null):Discovery=>({id,shownAt,correct,choice:null,certainty:null,answer:{zh:'答案',en:'Answer'}})
describe('每日改观',()=>{
 it('使用本地日历日期，不以 UTC 日界线切换',()=>{ const date=new Date(2026,9,6,0,5);expect(localDay(date)).toBe('2026-10-06') })
 it('新用户获得三个不同且有效的问题',()=>{ const round=dailyQuestions('2026-10-06',[]);expect(round).toHaveLength(3);expect(new Set(round.map(q=>q.id)).size).toBe(3);round.forEach(q=>expect(q.choices.zh[q.answer]).toBeTruthy()) })
 it('历史存在时组合两条新题和一条待复习题',()=>{const id=PLAY_QUESTIONS[0].id; const round=dailyQuestions('2026-10-06',[record(id,new Date(2026,9,4,12).toISOString(),false)]);expect(round.filter(q=>q.id===id)).toHaveLength(1);expect(round.filter(q=>q.id!==id)).toHaveLength(2)})
 it('本日作答不会打乱本日问题',()=>{const day='2026-10-06',round=dailyQuestions(day,[]);const updated=dailyQuestions(day,[record(round[0].id,new Date(2026,9,6,12).toISOString(),true)]);expect(updated).toEqual(round)})
 it('全部题目见过以后仍可复习三条不同内容',()=>{const records=PLAY_QUESTIONS.map(q=>record(q.id,new Date(2026,9,4,12).toISOString(),true));const round=dailyQuestions('2026-10-06',records);expect(round).toHaveLength(3);expect(new Set(round.map(q=>q.id)).size).toBe(3)})
 it('优先复习选错的内容',()=>{const records=[record(PLAY_QUESTIONS[0].id,new Date(2026,9,1,12).toISOString(),true),record(PLAY_QUESTIONS[1].id,new Date(2026,9,4,12).toISOString(),false)];expect(dailyQuestions('2026-10-06',records)[2].id).toBe(PLAY_QUESTIONS[1].id)})
})

describe('重新作答与续玩',()=>{
 it('只保留最新一次仍选错或跳过的题，答对后不再出现',()=>{
  const id=PLAY_QUESTIONS[0].id
  const records=[record(id,new Date(2026,9,1,12).toISOString(),false),record(id,new Date(2026,9,2,12).toISOString(),true)]
  expect(reviewQuestions('2026-10-07',records)).toEqual([])
  expect(reviewQuestions('2026-10-07',[...records,record(id,new Date(2026,9,3,12).toISOString(),null)]).map(q=>q.id)).toEqual([id])
 })
 it('本日刚作答的题不立即放回复习，且历史乱序不覆盖新记录',()=>{
  const id=PLAY_QUESTIONS[0].id
  expect(reviewQuestions('2026-10-07',[record(id,new Date(2026,9,7,12).toISOString(),false),record(id,new Date(2026,9,1,12).toISOString(),false)])).toEqual([])
 })
 it('续玩从第一个未揭晓的题开始，全部完成后进入结果页',()=>{
  const questions=dailyQuestions('2026-10-07',[])
  expect(resumeStep(questions,[])).toBe(0)
  expect(resumeStep(questions,[record(questions[0].id,new Date().toISOString(),null)])).toBe(1)
  expect(resumeStep(questions,questions.map(q=>record(q.id,new Date().toISOString(),true)))).toBe(3)
  expect(resumeStep(questions,[record(questions[2].id,new Date().toISOString(),true)])).toBe(0)
 })
 it('复习题保持原有中英文选项和答案对应，忽略未知题与无效时间',()=>{
  const q=PLAY_QUESTIONS[0]
  const records=[record(q.id,'invalid',false),record('unknown',new Date(2026,9,1,12).toISOString(),false),record(q.id,new Date(2026,9,1,12).toISOString(),false)]
  expect(reviewQuestions('2026-10-07',records)).toEqual([q])
 })
})
