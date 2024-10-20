// app/api/surveys/questions/route.ts

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { survey_id, question_text, question_type } = await request.json();

    const { data: newQuestion, error: insertError } = await supabase
      .from("survey_questions")
      .insert([{ survey_id, question_text, question_type }])
      .single();

    if (insertError) {
      return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
    }

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
