﻿using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Json.More;

/// <summary>
/// Calculates equality between two <see cref="JsonElement"/>s.
/// </summary>
/// <remarks>
/// This comparison is compliant with the ideals expressed by JSON:
///
/// - Objects are unordered.
/// - Arrays are ordered.
/// </remarks>
public class JsonNodeEqualityComparer : IEqualityComparer<JsonNode>
{
	/// <summary>
	/// A singleton instance for convenience.
	/// </summary>
	public static JsonNodeEqualityComparer Instance { get; } = new();

	/// <summary>Determines whether the specified objects are equal.</summary>
	/// <param name="x">The first object of type T to compare.</param>
	/// <param name="y">The second object of type T to compare.</param>
	/// <returns>true if the specified objects are equal; otherwise, false.</returns>
	public bool Equals(JsonNode x, JsonNode y)
	{
		return x.IsEquivalentTo(y);
	}

	/// <summary>Returns a hash code for the specified object.</summary>
	/// <param name="obj">The <see cref="T:System.Object"></see> for which a hash code is to be returned.</param>
	/// <returns>A hash code for the specified object.</returns>
	/// <exception cref="T:System.ArgumentNullException">The type of <paramref name="obj">obj</paramref> is a reference type and <paramref name="obj">obj</paramref> is null.</exception>
	public int GetHashCode(JsonNode obj)
	{
		return obj.GetEquivalenceHashCode();
	}
}