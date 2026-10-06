import { describe,it,expect } from 'vitest'
import { dailyQuestions,localDay,type Discovery } from './journal'
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
