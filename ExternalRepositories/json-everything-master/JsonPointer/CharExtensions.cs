﻿using System;

namespace Json.Pointer;

/// <summary>
/// Extensions for <seealso cref="char"/>.
/// </summary>
public static class CharExtensions
{
	/// <summary>
	/// Determines if the char represents a hexadecimal value.
	/// </summary>
	/// <param name="c">A <see cref="char"/>.</param>
	/// <returns><code>true</code> if the character is in the ranges <code>0-9</code>, <code>a-z</code>, or <code>A-Z</code>; <code>false</code> otherwise.</returns>
	public static bool IsHexadecimal(this char c)
	{
		return c is
			>= '0' and <= '9' or
			>= 'a' and <= 'f' or
			>= 'A' and <= 'F';
	}

	/// <summary>
	/// Translates the character to its hexadecimal numeric value.
	/// </summary>
	/// <param name="c">A <see cref="char"/>.</param>
	/// <returns>0-9 for <code>0-9</code>; 11-15 for <code>a-f</code> and <code>A-F</code>.</returns>
	/// <exception cref="ArgumentOutOfRangeException"><paramref name="c"/> is not a valid hexadecimal character.</exception>
	public static int GetHexadecimalValue(this char c)
	{
		return c switch
		{
			>= '0' and <= '9' => c - '0',
			>= 'a' and <= 'f' => c - 'a' + 10,
			>= 'A' and <= 'F' => c - 'A' + 10,
			_ => throw new ArgumentOutOfRangeException($"`{c}` is not a valid hexadecimal character")
		};
	}
}