/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/surveys/route.ts

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../lib/supabaseClient";

/**
 * Handles GET requests to fetch all surveys.
 * @param _request - The incoming request (unused).
 * @returns A JSON response with the list of surveys or an error message.
 */
export async function GET(_request: NextRequest) {
  try {
    const { data: surveys, error: fetchError } = await supabase.from("surveys").select("*");

    if (fetchError) {
      return NextResponse.json({ error: "Failed to fetch surveys" }, { status: 500 });
    }

    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Handles POST requests to create a new survey.
 * @param request - The incoming request containing survey data.
 * @returns A JSON response with the newly created survey or an error message.
 */
export async function POST(request: NextRequest) {
  try {
    const { title, description, min_respondents, max_respondents, start_date, end_date } = await request.json();

    const { data: newSurvey, error: insertError } = await supabase
      .from("surveys")
      .insert([{ title, description, min_respondents, max_respondents, start_date, end_date }])
      .single();

    if (insertError) {
      return NextResponse.json({ error: "Failed to create survey" }, { status: 500 });
    }

    return NextResponse.json(newSurvey, { status: 201 });
  } catch (error) {
    console.error("Error creating survey:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
