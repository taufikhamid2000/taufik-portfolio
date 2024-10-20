/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/surveys/questions/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../../../lib/supabaseClient";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data: question, error } = await supabase
      .from("questions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  try {
    const { data: updatedQuestion, error } = await supabase
      .from("questions")
      .update(body)
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
    }

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
    }

    return NextResponse.json({ message: "Question deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
