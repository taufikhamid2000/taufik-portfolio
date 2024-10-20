// app/api/surveys/responses/route.ts

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { survey_id, question_id, respondent_id, response_text } = await request.json();

    const { data: newResponse, error: insertError } = await supabase
      .from("survey_responses")
      .insert([{ survey_id, question_id, respondent_id, response_text }])
      .single();

    if (insertError) {
      return NextResponse.json({ error: "Failed to create response" }, { status: 500 });
    }

    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}