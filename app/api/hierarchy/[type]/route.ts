import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabaseClient';

export async function GET(request: Request, { params }: { params: { type: string } }) {
  const { type } = params;
  const allowedTypes = ['levels', 'subjects', 'chapters', 'lessons'];

  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ message: `Invalid type: ${type}` }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from(type).select('*');

    if (error) {
      console.error(`Error fetching ${type}:`, error.message);
      return NextResponse.json({ message: `Error fetching ${type}` }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { type: string } }) {
  const { type } = params;
  const allowedTypes = ['levels', 'subjects', 'chapters', 'lessons'];

  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ message: `Invalid type: ${type}` }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { data, error } = await supabase.from(type).insert([body]).single();

    if (error) {
      console.error(`Error adding to ${type}:`, error.message);
      return NextResponse.json({ message: `Error adding to ${type}` }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { type: string; id: string } }) {
  const { type, id } = params;
  const allowedTypes = ['levels', 'subjects', 'chapters', 'lessons'];

  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ message: `Invalid type: ${type}` }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { data, error } = await supabase.from(type).update(body).eq('id', id).single();

    if (error) {
      console.error(`Error updating ${type}:`, error.message);
      return NextResponse.json({ message: `Error updating ${type}` }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { type: string; id: string } }) {
  const { type, id } = params;
  const allowedTypes = ['levels', 'subjects', 'chapters', 'lessons'];

  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ message: `Invalid type: ${type}` }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from(type).delete().eq('id', id).single();

    if (error) {
      console.error(`Error deleting from ${type}:`, error.message);
      return NextResponse.json({ message: `Error deleting from ${type}` }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
  }
}