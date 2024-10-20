/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/surveys/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../lib/supabaseClient";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data: survey, error } = await supabase
      .from("surveys")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    return NextResponse.json(survey, { status: 200 });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  try {
    const { data: updatedSurvey, error } = await supabase
      .from("surveys")
      .update(body)
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to update survey" }, { status: 500 });
    }

    return NextResponse.json(updatedSurvey, { status: 200 });
  } catch (error) {
    console.error("Error updating survey:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from("surveys")
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to delete survey" }, { status: 500 });
    }

    return NextResponse.json({ message: "Survey deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting survey:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
